<!-- eslint-disable vue/no-v-html -->
<template>
    <nav
        class="breadcrumbs-container"
        :class="[`style-${content.displayStyle || 'standard'}`, { collapsed: content.collapse }]"
        aria-label="Breadcrumb"
    >
        <ol class="breadcrumbs-list">
            <li
                v-for="(item, index) in breadcrumbItems"
                :key="index"
                class="breadcrumb-item"
                :class="{
                    active: item.isActive,
                    'with-icon': item.icon,
                }"
            >
                <wwLayoutItemContext is-repeat :index="index" :data="item">
                    <wwElement
                        v-bind="content.linkElement"
                        class="breadcrumb-link"
                        :ww-props="{ wwLink: item.link, noDropzone: true }"
                    >
                        <wwElement
                            v-if="item.icon"
                            :ww-props="{
                                icon: item.icon,
                                color: item.isActive ? content.activeIconColor : content.iconColor,
                            }"
                            v-bind="content.iconElement"
                            class="breadcrumb-icon"
                        />

                        <wwElement
                            :ww-props="{
                                text: item.label,
                            }"
                            v-bind="content.textElement"
                            class="breadcrumb-text"
                        />
                    </wwElement>

                    <!-- Separator -->
                    <span
                        class="breadcrumb-separator"
                        :class="{
                            'breadcrumb-separator-alignment-fix': ['chevron', 'arrow', 'dot', 'dash'].includes(
                                content.separatorType
                            ),
                            'invisible-separator': index === breadcrumbItems.length - 1,
                        }"
                        :style="{
                            color: content.separatorColor,
                            fontSize: content.separatorSize,
                        }"
                    >
                        <span
                            v-if="content.separatorType === 'custom' && content.customSeparator"
                            class="breadcrumb-separator-custom"
                            v-html="content.customSeparator"
                        ></span>
                        <template v-else>
                            {{ getSeparator(content.separatorType) }}
                        </template>
                    </span>
                </wwLayoutItemContext>
            </li>
        </ol>
    </nav>
</template>

<script>
import { computed, ref } from 'vue';

export default {
    props: {
        content: {
            type: Object,
            required: true,
        },
        uid: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        // Create a map to store icon HTML for each item
        const itemIconsHTML = ref({});

        // Get current editor path if in editor
        const getEditorPath = () => {
            // eslint-disable-next-line no-unreachable
            return null;
        };

        const frontRouter = wwLib.getFrontRouter();

        const currentPath = computed(() => {
            const editorPath = getEditorPath();
            return editorPath || frontRouter.currentRoute.value.path;
        });

        // Extract path parameters from a path with dynamic segments
        const extractPathParams = (templatePath, actualPath) => {
            // Get param names from template path - matches {{paramName|defaultValue}}
            const paramNameRegex = /\{\{([^|]+)\|[^}]*\}\}/g;
            const paramNames = [];
            let match;

            while ((match = paramNameRegex.exec(templatePath)) !== null) {
                paramNames.push(match[1]); // Add the param name (first capture group)
            }

            if (!paramNames.length) return null; // No params in this path

            // Convert template path to regex with capture groups
            // Replace {{paramName|defaultValue}} with capture groups
            const regexTemplate = templatePath
                .replace(/\//g, '\\/') // Escape slashes
                .replace(/\{\{[^}]+\}\}/g, '([^/]+)'); // Replace param patterns with capture groups

            const pathRegex = new RegExp(`^${regexTemplate}$`);

            // Remove leading slash for matching
            const normalizedActualPath = actualPath.startsWith('/') ? actualPath.substring(1) : actualPath;

            // Extract values
            const valueMatch = normalizedActualPath.match(pathRegex);

            if (!valueMatch) return null;

            // Create params object
            const params = {};

            // Skip index 0 which is the full match
            for (let i = 0; i < paramNames.length; i++) {
                params[paramNames[i]] = valueMatch[i + 1];
            }

            return params;
        };

        // Match a path and return the matched page if found, along with extracted parameters
        const matchPath = path => {
            // Get all website pages
            const pages = wwLib.wwWebsiteData.getPages();

            // Normalize input path (remove leading slash if present)
            const normalizedPath = path.startsWith('/') ? path.substring(1) : path;

            for (const page of pages) {
                // Get the correct path for current language
                const pagePath = page.paths[wwLib.wwLang.lang] || page.paths.default;

                // Skip pages without paths
                if (!pagePath) continue;

                if (normalizedPath === '' && pagePath === 'home') {
                    return { page, params: null };
                }

                // Convert page path pattern to regex
                // Replace {{varName|defaultValue}} with regex that matches any value
                const pathPattern = pagePath.replace(/\{\{[^}]+\}\}/g, '[^/]+');
                const pathRegex = new RegExp(`^${pathPattern}$`);

                // Check if normalized path matches the pattern
                if (pathRegex.test(normalizedPath)) {
                    // Extract params if the path contains dynamic segments
                    const params = pagePath.includes('{{') ? extractPathParams(pagePath, normalizedPath) : null;

                    return { page, params };
                }
            }

            return null;
        };

        // Generate breadcrumbs from the reactive URL path
        const generateBreadcrumbsFromUrl = () => {
            // Split the path into segments and filter out empty segments
            const pathSegments = currentPath.value.split('/').filter(segment => segment);
            if (pathSegments[0] !== '') {
                pathSegments.unshift('');
            }

            // Create breadcrumb items from path segments
            const items = [];

            // Add items for each path segment
            let currentUrl = '';
            const currentPageId = wwLib.wwWebsiteData.getCurrentPage().linkId;

            for (let i = 0; i < pathSegments.length; i++) {
                const segment = pathSegments[i];
                if (segment !== '') {
                    currentUrl += `/${segment}`;
                }

                // Format the segment for display (capitalize, replace hyphens with spaces, decode URL components)
                const formattedLabel = decodeURIComponent(segment)
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, char => char.toUpperCase());

                // Check if the path exists
                const matched = matchPath(currentUrl);

                items.push({
                    label: segment === '' ? 'Home' : formattedLabel,
                    icon: null,
                    isActive: matched && matched.page.linkId === currentPageId,
                    ...(matched
                        ? {
                              link: {
                                  type: 'internal',
                                  pageId: matched.page.linkId,
                                  targetBlank: false,
                                  ...(matched.params ? { parameters: matched.params } : {}),
                              },
                          }
                        : undefined),
                });
            }
            return items;
        };

        // Update the breadcrumbItems computed property
        const breadcrumbItems = computed(() => {
            // If in auto mode, generate breadcrumbs from URL path
            if (props.content?.mode === 'auto') {
                return generateBreadcrumbsFromUrl();
            }

            // Otherwise, use the manual items
            // Handle both array of objects and simple array of strings
            if (!Array.isArray(props.content?.items)) return [];

            const currentPageId = wwLib.wwWebsiteData.getCurrentPage().linkId;

            return props.content.items.map(item => {
                if (typeof item === 'string') {
                    return { label: item, hasLink: false };
                }

                // If it's an object, ensure it has a label
                if (typeof item === 'object') {
                    const label = wwLib.wwUtils.resolveObjectPropertyPath(
                        item,
                        props.content?.labelPropertyPath || 'label'
                    );

                    const link = wwLib.wwUtils.resolveObjectPropertyPath(
                        item,
                        props.content?.urlPropertyPath || 'link'
                    );

                    const icon = wwLib.wwUtils.resolveObjectPropertyPath(
                        item,
                        props.content?.iconPropertyPath || 'icon'
                    );

                    // Check if this item is active (if it has an internal link to the current page)
                    const isActive = link?.type === 'internal' && link?.pageId === currentPageId;

                    const data = {
                        ...item,
                        label: typeof label === 'object' ? wwLib.wwLang.getText(label) : label,
                        link: link || null,
                        icon: icon || null,
                        isActive: isActive,
                    };

                    return data;
                }

                return { label: 'Invalid item' };
            });
        });

        // Editor state
        const isEditing = computed(() => {
            // eslint-disable-next-line no-unreachable
            return false;
        });

        // Methods
        const getSeparator = type => {
            switch (type) {
                case 'slash':
                    return '/';
                case 'arrow':
                    return '›';
                case 'chevron':
                    return '>';
                case 'dot':
                    return '•';
                case 'pipe':
                    return '|';
                case 'dash':
                    return '-';
                default:
                    return '/';
            }
        };

        const onItemClick = item => {
            if (isEditing.value) return;

            // Handle navigation using wwLib.wwApp.goTo
            if (item.url && typeof wwLib !== 'undefined' && wwLib.wwApp) {
                wwLib.wwApp.goTo(item.url);
            }
        };

        return {
            breadcrumbItems,
            getSeparator,
            onItemClick,
            isEditing,
            itemIconsHTML,
        };
    },
};
</script>

<style lang="scss">
.breadcrumbs-container {
    font-size: v-bind('content.fontSize || "14px"');

    .breadcrumbs-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: v-bind('content.itemSpacing || "4px"');
    }

    .breadcrumb-item {
        display: flex;
        align-items: center;
        white-space: nowrap;

        &.with-icon {
            display: flex;
            align-items: center;
        }

        .breadcrumb-icon {
            display: inline-flex;
            align-items: center;
            margin-right: 4px;

            &.invisible-icon {
                opacity: 0;
                visibility: hidden;
            }
        }

        .breadcrumb-link {
            text-decoration: none;
            transition: color 0.2s ease;
            color: v-bind('content.linkColor || "#6B7280"');
        }

        .breadcrumb-text {
            transition: text-decoration 0.2s ease;
        }

        .breadcrumb-link:hover .breadcrumb-text {
            text-decoration: v-bind('content.hoverDecoration || "none"');
        }

        .breadcrumb-separator {
            margin: 0 v-bind('content.separatorSpacing || "8px"');
            display: inline-flex;
            align-items: center;

            &.breadcrumb-separator-alignment-fix {
                margin-top: calc(-0.14 * v-bind('parseInt(content.separatorSize || "12")') * 1px + 4px);
            }

            &.invisible-separator {
                width: 0;
                margin: 0;
                visibility: hidden;
            }

            &-custom {
                display: flex;
                align-items: center;
                justify-content: center;

                /* Scale custom separator content to match separator size */
                img,
                svg {
                    width: v-bind('content.separatorSize || "12px"');
                    height: v-bind('content.separatorSize || "12px"');
                    object-fit: contain;
                }

                /* Ensure text content is sized appropriately */
                font-size: inherit;
                line-height: 1;
            }
        }

        &.active {
            .breadcrumb-link,
            .breadcrumb-text {
                font-weight: v-bind('content.activeItemFontWeight || "600"');
                color: v-bind('content.activeColor || "#111827"');
            }
        }
    }

    &.style-pills {
        .breadcrumb-item {
            background-color: v-bind('content.pillBackgroundColor || "#f0f0f0"');
            padding: 4px 12px;
            border-radius: 16px;
            display: flex;
            align-items: center;

            .breadcrumb-link {
                display: flex;
                align-items: center;
            }

            .breadcrumb-separator {
                background-color: transparent;
            }

            &.active {
                background-color: v-bind('content.activePillBackgroundColor || "#e0e0e0"');
            }
        }
    }

    &.style-arrows {
        .breadcrumb-item {
            position: relative;
            padding: 4px calc(v-bind('content.separatorSpacing || "12px"') * 2) 4px
                calc(v-bind('content.separatorSpacing || "12px"') * 2);

            &:first-child {
                padding-left: v-bind('content.separatorSpacing || "12px"');
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
            }

            &:last-child {
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
            }

            &:after {
                content: '';
                position: absolute;
                top: 0;
                right: calc(-0.5 * v-bind('content.separatorSize || "12px"'));
                width: v-bind('content.separatorSize || "12px"');
                height: 100%;
                background-color: v-bind('content.arrowColor || "#FFFFFF"');
                clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%);
                z-index: 1;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            }

            &:last-child:after {
                right: calc(-0.5 * v-bind('content.separatorSize || "12px"'));
            }

            .breadcrumb-separator {
                display: none;
            }
        }
    }

    &.style-underline {
        .breadcrumb-item {
            .breadcrumb-link {
                text-decoration: underline;
            }
        }
    }

    // Collapsed behavior
    &.collapsed {
        .breadcrumbs-list {
            position: relative;

            // Hide all middle items
            .breadcrumb-item:not(:first-child):not(:last-child) {
                display: none;
            }

            // Show ellipsis between first and last items
            .breadcrumb-item:first-child {
                &::after {
                    content: '...';
                    display: inline-block;
                    margin: 0 8px;
                }
            }

            // Adjust separator for the first item
            .breadcrumb-item:first-child .breadcrumb-separator {
                display: none;
            }
        }
    }
}
</style>
