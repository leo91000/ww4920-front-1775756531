export default {
    options: {
        displayAllowedValues: ['flex', 'inline-flex'],
    },
    inherit: {
        type: 'ww-layout',
    },
    editor: {
        label: {
            en: 'Breadcrumbs',
        },
        icon: 'map',
        customStylePropertiesOrder: [
            ['colorsTitle', 'linkColor', 'activeColor', 'separatorColor', 'iconColor', 'activeIconColor'],
            ['typographyTitle', 'fontSize', 'activeItemFontWeight', 'hoverDecoration'],
            ['spacingLayoutTitle', 'itemSpacing'],
            ['separatorsBordersTitle', 'separatorSpacing', 'separatorSize', 'arrowColor'],
            ['pillBackgroundColor', 'activePillBackgroundColor'],
        ],
        customSettingsPropertiesOrder: [
            ['mode'],
            ['displayStyle', 'separatorType', 'customSeparator', 'collapse'],
            ['items', 'labelPropertyPath', 'urlPropertyPath', 'iconPropertyPath'],
        ],
    },
    properties: {
        // Style section titles
        colorsTitle: {
            type: 'Title',
            label: 'Colors',
            section: 'style',
            editorOnly: true,
        },
        typographyTitle: {
            type: 'Title',
            label: 'Typography',
            section: 'style',
            editorOnly: true,
        },
        spacingLayoutTitle: {
            type: 'Title',
            label: 'Spacing & Layout',
            section: 'style',
            editorOnly: true,
        },
        separatorsBordersTitle: {
            type: 'Title',
            label: 'Separators & Borders',
            section: 'style',
            editorOnly: true,
        },

        // Data settings
        items: {
            label: { en: 'Breadcrumb Items' },
            type: 'Array',
            section: 'settings',
            bindable: true,
            hidden: content => content.mode === 'auto',
            defaultValue: [
                {
                    label: { en: 'Home' },
                    link: '/',
                },
                { label: { en: 'Products' }, link: '/products' },
                { label: { en: 'Category' }, link: '/products/category' },
                { label: { en: 'Current Page' }, link: '/products/category/item' },
            ],
            options: {
                expandable: true,
                getItemLabel(item, index) {
                    const label = item?.label;
                    if (!label) return `Item ${index + 1}`;
                    return typeof label === 'string'
                        ? label
                        : label?.en || Object.values(label)[0] || `Item ${index + 1}`;
                },
                item: {
                    type: 'Object',
                    defaultValue: {
                        label: { en: 'New Item' },
                        url: '#',
                        icon: null,
                    },
                    options: {
                        item: {
                            label: {
                                label: 'Label',
                                type: 'Text',
                                multiLang: true,
                                options: { placeholder: 'Item Label' },
                                defaultValue: {
                                    en: 'New Item',
                                },
                            },
                            link: {
                                label: 'Link',
                                type: 'Link',
                                defaultValue: {
                                    en: '#',
                                },
                            },
                            icon: {
                                label: 'Icon',
                                type: 'SystemIcon',
                            },
                        },
                    },
                },
            },
        },
        mode: {
            label: { en: 'Mode' },
            type: 'TextRadioGroup',
            section: 'settings',
            bindable: true,
            classes: true,
            defaultValue: 'manual',
            options: {
                choices: [
                    { value: 'manual', title: 'Manual', icon: 'pencil' },
                    { value: 'auto', title: 'Auto', icon: 'refresh' },
                ],
            },
        },
        labelPropertyPath: {
            label: { en: 'Label Property' },
            type: 'ObjectPropertyPath',
            section: 'settings',
            bindable: true,
            classes: true,
            options: content => ({
                object: content.items?.[0] || {},
            }),
            defaultValue: 'label',
            hidden: (content, sidepanelContent, boundProps) =>
                !Array.isArray(content.items) || !content.items?.length || !boundProps.items,
        },
        urlPropertyPath: {
            label: { en: 'URL Property' },
            type: 'ObjectPropertyPath',
            section: 'settings',
            bindable: true,
            classes: true,
            options: content => ({
                object: content.items?.[0] || {},
            }),
            defaultValue: 'link',
            hidden: (content, sidepanelContent, boundProps) =>
                content.mode === 'auto' || !Array.isArray(content.items) || !content.items?.length || !boundProps.items,
        },
        iconPropertyPath: {
            label: { en: 'Icon Property' },
            type: 'ObjectPropertyPath',
            section: 'settings',
            bindable: true,
            classes: true,
            options: content => ({
                object: content.items?.[0] || {},
            }),
            defaultValue: 'icon',
            hidden: (content, sidepanelContent, boundProps) =>
                !Array.isArray(content.items) || !content.items?.length || !boundProps.items,
        },

        // Display settings
        displayStyle: {
            label: { en: 'Display Style' },
            type: 'TextRadioGroup',
            section: 'settings',
            bindable: true,
            classes: true,
            defaultValue: 'standard',
            options: {
                choices: [
                    { value: 'standard', title: 'Standard', icon: 'align-left' },
                    { value: 'pills', title: 'Pills', icon: 'badge-check' },
                    { value: 'arrows', title: 'Arrows', icon: 'chevron-right' },
                    { value: 'underline', title: 'Underline', icon: 'underline' },
                ],
            },
        },
        separatorType: {
            label: { en: 'Separator Type' },
            type: 'TextSelect',
            section: 'settings',
            bindable: true,
            classes: true,
            defaultValue: 'slash',
            hidden: content => content.displayStyle === 'arrows',
            options: {
                options: [
                    { value: 'slash', label: 'Slash (/)' },
                    { value: 'arrow', label: 'Arrow (›)' },
                    { value: 'chevron', label: 'Chevron (>)' },
                    { value: 'dot', label: 'Dot (•)' },
                    { value: 'pipe', label: 'Pipe (|)' },
                    { value: 'dash', label: 'Dash (-)' },
                    { value: 'custom', label: 'Custom' },
                ],
            },
        },
        customSeparator: {
            label: { en: 'Custom Separator' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            classes: true,
            defaultValue: '',
            hidden: content => content.separatorType !== 'custom' || content.displayStyle === 'arrows',
        },
        collapse: {
            label: { en: 'Collapse the breacrumb' },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            classes: true,
            defaultValue: false,
        },

        // Styling - Colors
        linkColor: {
            label: { en: 'Link Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            defaultValue: '#6B7280',
        },
        activeColor: {
            label: { en: 'Active Item Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            defaultValue: '#111827',
        },
        separatorColor: {
            label: { en: 'Separator Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            defaultValue: '#9CA3AF',
        },
        iconColor: {
            label: { en: 'Icon Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            defaultValue: '#4B5563',
        },
        activeIconColor: {
            label: { en: 'Active Icon Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            defaultValue: '#111827',
        },

        // Style-specific colors
        pillBackgroundColor: {
            label: { en: 'Pill Background' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            defaultValue: '#f0f0f0',
            hidden: content => content.displayStyle !== 'pills',
        },
        activePillBackgroundColor: {
            label: { en: 'Active Pill Background' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            defaultValue: '#e0e0e0',
            hidden: content => content.displayStyle !== 'pills',
        },

        arrowColor: {
            label: { en: 'Arrow Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            defaultValue: '#FFFFFF',
            hidden: content => content.displayStyle !== 'arrows',
        },

        // Styling - Typography
        fontSize: {
            label: { en: 'Font Size' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            defaultValue: '14px',
            options: {
                unitChoices: [
                    { value: 'normal', label: 'auto', default: true },
                    { value: 'px', label: 'px', min: 2, max: 100 },
                    { value: '%', label: '%', min: 1, max: 100 },
                    { value: 'em', label: 'em', min: 0.01, max: 10, digits: 3, step: 0.1 },
                    { value: 'rem', label: 'rem', min: 0.01, max: 10, digits: 3, step: 0.1 },
                ],
            },
        },
        activeItemFontWeight: {
            label: { en: 'Active Item Font Weight' },
            type: 'TextSelect',
            section: 'style',
            bindable: true,
            classes: true,
            defaultValue: '600',
            options: {
                options: [
                    { value: 'normal', label: 'Normal' },
                    { value: 'bold', label: 'Bold' },
                    { value: '100', label: '100 (Thin)' },
                    { value: '200', label: '200' },
                    { value: '300', label: '300' },
                    { value: '400', label: '400 (Normal)' },
                    { value: '500', label: '500 (Medium)' },
                    { value: '600', label: '600 (Semi-Bold)' },
                    { value: '700', label: '700 (Bold)' },
                    { value: '800', label: '800' },
                    { value: '900', label: '900 (Black)' },
                ],
            },
        },
        hoverDecoration: {
            label: { en: 'Hover Text Decoration' },
            type: 'TextSelect',
            section: 'style',
            bindable: true,
            classes: true,
            defaultValue: 'none',
            options: {
                options: [
                    { value: 'none', label: 'None' },
                    { value: 'underline', label: 'Underline' },
                    { value: 'overline', label: 'Overline' },
                    { value: 'line-through', label: 'Line Through' },
                ],
            },
        },

        itemSpacing: {
            label: { en: 'Item Spacing' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            defaultValue: '8px',
            options: {
                unitChoices: [
                    { value: 'normal', label: 'auto', default: true },
                    { value: 'px', label: 'px', min: 0, max: 100 },
                    { value: '%', label: '%', min: 0, max: 100 },
                    { value: 'em', label: 'em', min: 0, max: 10, digits: 3, step: 0.1 },
                    { value: 'rem', label: 'rem', min: 0, max: 10, digits: 3, step: 0.1 },
                    { value: 'unset', label: 'none' },
                ],
            },
        },
        separatorSpacing: {
            label: { en: 'Separator Spacing' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            defaultValue: '12px',
            options: {
                unitChoices: [
                    { value: 'normal', label: 'auto', default: true },
                    { value: 'px', label: 'px', min: 0, max: 100 },
                    { value: '%', label: '%', min: 0, max: 100 },
                    { value: 'em', label: 'em', min: 0, max: 10, digits: 3, step: 0.1 },
                    { value: 'rem', label: 'rem', min: 0, max: 10, digits: 3, step: 0.1 },
                    { value: 'unset', label: 'none' },
                ],
            },
        },
        separatorSize: {
            label: { en: 'Separator Size' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            defaultValue: '12px',
            options: {
                unitChoices: [
                    { value: 'normal', label: 'auto', default: true },
                    { value: 'px', label: 'px', min: 1, max: 100 },
                    { value: '%', label: '%', min: 0.1, max: 100 },
                    { value: 'em', label: 'em', min: 0.01, max: 10, digits: 3, step: 0.1 },
                    { value: 'rem', label: 'rem', min: 0.01, max: 10, digits: 3, step: 0.1 },
                ],
            },
        },
        linkElement: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-flexbox' },
        },
        iconElement: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-icon' },
        },
        textElement: {
            hidden: true,
            defaultValue: { isWwObject: true, type: 'ww-text' },
        },
    },
};
