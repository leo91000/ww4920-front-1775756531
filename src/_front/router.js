import { createRouter, createWebHistory } from 'vue-router';

import wwPage from './views/wwPage.vue';

import {
    initializeData,
    initializePlugins,
    initializeIntegrationInstances,
    onPageUnload,
} from '@/_common/helpers/data';
import { convertPathToRouterFormat } from '@/_common/helpers/urlParametersParsing';
import { isPublishedProductionHost } from '@/_common/helpers/publishedRuntimeEnv.js';

import { useBackAuthStore } from '@/pinia/backAuth.js';

let router;
const routes = [];

function scrollBehavior(to) {
    if (to.hash) {
        return {
            el: to.hash,
            behavior: 'smooth',
        };
    } else {
        return { top: 0 };
    }
}

 
/* wwFront:start */
import pluginsSettings from '../../plugins-settings.json';

// eslint-disable-next-line no-undef
window.wwg_designInfo = {"id":"faa5ce34-1579-45df-b65a-564710de0c3d","homePageId":"1efccf97-2beb-4f4a-92f0-963f73420cf8","authPluginId":null,"baseTag":null,"defaultTheme":"light","langs":[{"lang":"en","default":true}],"background":{},"workflows":[],"back":{"isServerSetup":{"staging":true,"production":true}},"auth":{"integration":"weweb-auth","connectionId":null,"unauthenticatedPageId":null,"unauthorizedPageId":null},"pages":[{"id":"5662da9c-8284-4721-ab45-ed361b83f62e","linkId":"5662da9c-8284-4721-ab45-ed361b83f62e","name":"storage","folder":null,"paths":{"en":"storage","default":"storage"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"3db85cb0-df61-49a0-929b-473e499cf33e","sectionTitle":"Section","linkId":"03a14028-efb0-47ce-9aa1-c0e689e59faa"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"802a7a1c-a703-4d62-81a0-a1424e3592dd","linkId":"802a7a1c-a703-4d62-81a0-a1424e3592dd","name":"integration-table","folder":null,"paths":{"en":"integration-table","default":"integration-table"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"3f661bb1-4a00-49ce-87e1-6ed2c1c3dfed","sectionTitle":"Section","linkId":"de7a7b72-2e13-424c-9d2b-e351c6bf14ea"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"191cf98a-bf77-422f-8c2e-682fd98c1e0c","linkId":"191cf98a-bf77-422f-8c2e-682fd98c1e0c","name":"table-view","folder":null,"paths":{"en":"table-view","default":"table-view"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"5e09968a-d414-4caf-8edd-6b54eaa395bb","sectionTitle":"Section","linkId":"51fb26c9-640f-4960-b98f-2eab33723b84"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"3424c296-9629-4a0c-886f-1e013951ed4c","linkId":"3424c296-9629-4a0c-886f-1e013951ed4c","name":"deploy","folder":null,"paths":{"en":"deploy","default":"deploy"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"8e328de5-bcb7-44d5-8fa4-30c45b12a6df","sectionTitle":"Section","linkId":"517e0d38-4ac1-45d7-a7c8-455749e8b3da"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"dbc84b5b-a18f-45fc-824b-3778a1443cf5","linkId":"dbc84b5b-a18f-45fc-824b-3778a1443cf5","name":"test","folder":null,"paths":{"en":"test","default":"test"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"88d3ad19-116a-4a19-b18e-842e3111c27f","sectionTitle":"Section","linkId":"caac2c4b-2d39-46a4-b663-0829863e16fd"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"1efccf97-2beb-4f4a-92f0-963f73420cf8","linkId":"1efccf97-2beb-4f4a-92f0-963f73420cf8","name":"Home","folder":null,"paths":{"en":"home","default":"home"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"64e15e31-818a-4692-a4cc-7de616549be6","sectionTitle":"Root Container","linkId":"8d9d5a18-d725-4c44-aa1a-614c2e80df5c"}],"pageUserGroups":[],"title":{"en":"","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"ec4a1e30-3808-456b-85bf-2b650fa749a8","linkId":"ec4a1e30-3808-456b-85bf-2b650fa749a8","name":"realtime","folder":null,"paths":{"en":"realtime","default":"realtime"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"d09507a1-6846-43e7-817a-5eeaacd6c1f2","sectionTitle":"Section","linkId":"ec733810-a1f4-42b6-804a-3fb60d0228f7"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}}],"plugins":[]};
// eslint-disable-next-line no-undef
window.wwg_cacheVersion = 58;
// eslint-disable-next-line no-undef
window.wwg_pluginsSettings = pluginsSettings;
// eslint-disable-next-line no-undef
window.wwg_disableManifest = false;

const defaultLang = window.wwg_designInfo.langs.find(({ default: isDefault }) => isDefault) || {};

const registerRoute = (page, lang, forcedPath) => {
    const langSlug = !lang.default || lang.isDefaultPath ? `/${lang.lang}` : '';
    let path =
        forcedPath ||
        (page.id === window.wwg_designInfo.homePageId ? '/' : `/${page.paths[lang.lang] || page.paths.default}`);

    path = convertPathToRouterFormat(path);

    routes.push({
        path: langSlug + path,
        component: wwPage,
        name: `page-${page.id}-${lang.lang}`,
        meta: {
            pageId: page.id,
            lang,
            isPrivate: !!page.pageUserGroups?.length,
        },
        async beforeEnter(to, from) {
            if (to.name === from.name) return;
            //Set page lang
            wwLib.wwLang.defaultLang = defaultLang.lang;
            wwLib.$store.dispatch('front/setLang', lang.lang);

            //Init plugins
            await initializePlugins();

            //Init integration instances
            await initializeIntegrationInstances();

            if (wwLib.wwAuth.plugin) {
                if (page.pageUserGroups?.length) {
                    await wwLib.wwAuth.init();

                    // Redirect to not sign in page if not logged
                    if (!wwLib.wwAuth.getIsAuthenticated()) {
                        window.location.href = `${wwLib.wwPageHelper.getPagePath(
                            wwLib.wwAuth.getUnauthenticatedPageId()
                        )}?_source=${to.path}`;

                        return null;
                    }

                    //Check roles are required
                    if (
                        page.pageUserGroups.length > 1 &&
                        !wwLib.wwAuth.matchUserGroups(page.pageUserGroups.map(({ userGroup }) => userGroup))
                    ) {
                        window.location.href = `${wwLib.wwPageHelper.getPagePath(
                            wwLib.wwAuth.getUnauthorizedPageId()
                        )}?_source=${to.path}`;

                        return null;
                    }
                }
            } else {
                const backAuthStore = useBackAuthStore(wwLib.$pinia);
                if (!backAuthStore.projectAuth && window.wwg_designInfo.auth) {
                    backAuthStore.setProjectAuth(window.wwg_designInfo.auth);
                }
                await backAuthStore.refresh();
                const projectAuth = backAuthStore.projectAuth || {};

                //Check if private page
                if (page.security?.accessRule === 'authenticated') {
                    if (!backAuthStore.isAuthenticated) {
                        window.location.href = `${wwLib.wwPageHelper.getPagePath(
                            projectAuth.unauthenticatedPageId
                        )}?_source=${to.path}`;
                        return null;
                    } else if (page.security?.accessRoles?.length) {
                        const hasAccess =
                            page.security.accessRolesCondition === 'AND'
                                ? backAuthStore.matchAllRoles(page.security.accessRoles)
                                : backAuthStore.matchAnyRoles(page.security.accessRoles);
                        if (!hasAccess) {
                            window.location.href = `${wwLib.wwPageHelper.getPagePath(
                                projectAuth.unauthorizedPageId
                            )}?_source=${to.path}`;
                            return null;
                        }
                    }
                }
            }

            try {
                await import(`@/pages/${page.id.split('_')[0]}.js`);
                await wwLib.wwWebsiteData.fetchPage(page.id);

                //Scroll to section or on top after page change
                if (to.hash) {
                    const targetElement = document.getElementById(to.hash.replace('#', ''));
                    if (targetElement) targetElement.scrollIntoView();
                } else {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }

                return;
            } catch (err) {
                wwLib.$store.dispatch('front/showPageLoadProgress', false);

                if (err.redirectUrl) {
                    return { path: err.redirectUrl || '404' };
                } else {
                    //Any other error: go to target page using window.location
                    window.location = to.fullPath;
                }
            }
        },
    });
};

for (const page of window.wwg_designInfo.pages) {
    for (const lang of window.wwg_designInfo.langs) {
        if (!page.langs.includes(lang.lang)) continue;
        registerRoute(page, lang);
    }
}

const page404 = window.wwg_designInfo.pages.find(page => page.paths.default === '404');
if (page404) {
    for (const lang of window.wwg_designInfo.langs) {
        // Create routes /:lang/:pathMatch(.*)* etc for all langs of the 404 page
        if (!page404.langs.includes(lang.lang)) continue;
        registerRoute(
            page404,
            {
                default: false,
                lang: lang.lang,
            },
            '/:pathMatch(.*)*'
        );
    }
    // Create route /:pathMatch(.*)* using default project lang
    registerRoute(page404, { default: true, isDefaultPath: false, lang: defaultLang.lang }, '/:pathMatch(.*)*');
} else {
    routes.push({
        path: '/:pathMatch(.*)*',
        async beforeEnter() {
            window.location.href = '/404';
        },
    });
}

let routerOptions = {};

const isProd = isPublishedProductionHost(window.location.host);

if (isProd && window.wwg_designInfo.baseTag?.href) {
    let baseTag = window.wwg_designInfo.baseTag.href;
    if (!baseTag.startsWith('/')) {
        baseTag = '/' + baseTag;
    }
    if (!baseTag.endsWith('/')) {
        baseTag += '/';
    }

    routerOptions = {
        base: baseTag,
        history: createWebHistory(baseTag),
        routes,
    };
} else {
    routerOptions = {
        history: createWebHistory(),
        routes,
    };
}

router = createRouter({
    ...routerOptions,
    scrollBehavior,
});

//Trigger on page unload
let isFirstNavigation = true;
router.beforeEach(async (to, from) => {
    if (to.name === from.name) return;
    if (!isFirstNavigation) await onPageUnload();
    isFirstNavigation = false;
    wwLib.globalVariables._navigationId++;
    return;
});

//Init page
router.afterEach((to, from, failure) => {
    wwLib.$store.dispatch('front/showPageLoadProgress', false);
    let fromPath = from.path;
    let toPath = to.path;
    if (!fromPath.endsWith('/')) fromPath = fromPath + '/';
    if (!toPath.endsWith('/')) toPath = toPath + '/';
    if (failure || (from.name && toPath === fromPath)) return;
    initializeData(to);
});
/* wwFront:end */

export default router;
