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
window.wwg_designInfo = {"id":"faa5ce34-1579-45df-b65a-564710de0c3d","homePageId":"1efccf97-2beb-4f4a-92f0-963f73420cf8","authPluginId":null,"baseTag":null,"defaultTheme":"light","langs":[{"lang":"en","default":true}],"background":{},"workflows":[{"id":"76ae8493-e861-4f8e-bd2d-30f4b744011b","name":"logout","actions":{"d42c336d-ea42-45cd-97cd-57795dbabc70":{"id":"d42c336d-ea42-45cd-97cd-57795dbabc70","args":{"openUrl":false},"type":"auth0/logout","connectionId":"64078dc3-d25b-45df-9ec4-5b1f1053dcc4"}},"trigger":"onload-app","version":2,"firstAction":"d42c336d-ea42-45cd-97cd-57795dbabc70"}],"back":{"isServerSetup":{"staging":true,"production":true}},"auth":{"integration":"auth0","connectionId":"64078dc3-d25b-45df-9ec4-5b1f1053dcc4","unauthenticatedPageId":null,"unauthorizedPageId":null},"pages":[{"id":"4e9b5179-6b25-4208-9be4-2b15483c8807","linkId":"4e9b5179-6b25-4208-9be4-2b15483c8807","name":"date","folder":null,"paths":{"en":"date","default":"date"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"bfacd5af-3883-4997-bfd1-22671f698a96","sectionTitle":"Section","linkId":"5ff9eb26-f590-4ba7-8199-b014c57379f3"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"65b8411c-495a-452b-8590-f7f6b80819cf","linkId":"65b8411c-495a-452b-8590-f7f6b80819cf","name":"WW-4764 Preserve B","folder":null,"paths":{"en":"ww-4764-preserve-b","default":"ww-4764-preserve-b"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"5b7f4885-8333-4c0b-bbb0-1bdedb0dc7cd","sectionTitle":"Section","linkId":"5b7f4885-8333-4c0b-bbb0-1bdedb0dc7cd"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"4d65a11c-233d-42b9-8319-86386837e73c","linkId":"4d65a11c-233d-42b9-8319-86386837e73c","name":"form-propagation","folder":null,"paths":{"en":"form-propagation","default":"form-propagation"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"e13c0952-5069-4d20-8513-d2ad0b302286","sectionTitle":"Section","linkId":"fb669df6-d45f-4c5f-a11b-c5f4d2e5d48c"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"49ec9525-c547-415c-bc21-2f71f626ecf3","linkId":"49ec9525-c547-415c-bc21-2f71f626ecf3","name":"WW-4764 Preserve A","folder":null,"paths":{"en":"ww-4764-preserve-a","default":"ww-4764-preserve-a"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"1162707b-3b91-45d7-a006-0e653ff55a5a","sectionTitle":"Section","linkId":"1162707b-3b91-45d7-a006-0e653ff55a5a"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"2192689d-84b5-4968-8566-4c676eb9d425","linkId":"2192689d-84b5-4968-8566-4c676eb9d425","name":"ww-kanban","folder":null,"paths":{"en":"ww-kanban","default":"ww-kanban"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"4bdd4b7f-7f1b-4967-8b82-72ffd6322daa","sectionTitle":"Kanban Showcase Section","linkId":"c5ff8b2a-b66e-41d9-9690-0c5145b900b4"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"802a7a1c-a703-4d62-81a0-a1424e3592dd","linkId":"802a7a1c-a703-4d62-81a0-a1424e3592dd","name":"integration-table","folder":null,"paths":{"en":"integration-table","default":"integration-table"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"3f661bb1-4a00-49ce-87e1-6ed2c1c3dfed","sectionTitle":"Section","linkId":"de7a7b72-2e13-424c-9d2b-e351c6bf14ea"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"191cf98a-bf77-422f-8c2e-682fd98c1e0c","linkId":"191cf98a-bf77-422f-8c2e-682fd98c1e0c","name":"table-view","folder":null,"paths":{"en":"table-view","default":"table-view"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"5e09968a-d414-4caf-8edd-6b54eaa395bb","sectionTitle":"Section","linkId":"51fb26c9-640f-4960-b98f-2eab33723b84"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"3424c296-9629-4a0c-886f-1e013951ed4c","linkId":"3424c296-9629-4a0c-886f-1e013951ed4c","name":"deploy","folder":null,"paths":{"en":"deploy","default":"deploy"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"8e328de5-bcb7-44d5-8fa4-30c45b12a6df","sectionTitle":"Section","linkId":"517e0d38-4ac1-45d7-a7c8-455749e8b3da"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"80c39549-1b52-4873-8630-29557ad65b23","linkId":"80c39549-1b52-4873-8630-29557ad65b23","name":"chagne-variable-value-reporo","folder":null,"paths":{"en":"chagne-variable-value-reporo","default":"chagne-variable-value-reporo"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"294c7353-d926-42cd-af31-ab58ad307792","sectionTitle":"Section","linkId":"ff3788d4-5763-4a41-8298-e1a02c6888bb"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"53b2ac93-07eb-4bf9-89f0-440b7c0e5e20","linkId":"53b2ac93-07eb-4bf9-89f0-440b7c0e5e20","name":"toggle","folder":null,"paths":{"en":"toggle","default":"toggle"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"af5dec31-f0e4-474e-96d0-ba8ddbcae99d","sectionTitle":"Section","linkId":"4d984bbd-00fd-44c5-9efd-857f038158a1"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"e294552a-7222-4289-bd2a-8836b16fb95a","linkId":"e294552a-7222-4289-bd2a-8836b16fb95a","name":"ww-pdf-viewer","folder":null,"paths":{"en":"ww-pdf-viewer","default":"ww-pdf-viewer"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"7338a4fc-3d2b-477b-b6f4-58dae9076d5f","sectionTitle":"Header Section","linkId":"52bed2c1-539f-43af-80b7-b1323bc80400"},{"uid":"6b79d8ff-3883-4de6-94b4-45b53b199667","sectionTitle":"PDF Viewer Section","linkId":"8e96a780-acc9-4fa2-9b8a-84b6d5acd8b0"},{"uid":"5c85177b-4713-4373-8f04-3c0cc597171f","sectionTitle":"Features Section","linkId":"8f69d0e5-aece-443f-9b86-7457e2beb2ae"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"5662da9c-8284-4721-ab45-ed361b83f62e","linkId":"5662da9c-8284-4721-ab45-ed361b83f62e","name":"storage","folder":null,"paths":{"en":"storage","default":"storage"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"3db85cb0-df61-49a0-929b-473e499cf33e","sectionTitle":"Section","linkId":"03a14028-efb0-47ce-9aa1-c0e689e59faa"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"e821ee5d-6726-4555-9d77-1b5b29aae9b1","linkId":"e821ee5d-6726-4555-9d77-1b5b29aae9b1","name":"ww-timeline","folder":null,"paths":{"en":"ww-timeline","default":"ww-timeline"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"87659ae4-49b6-439b-9c88-545e135ed792","sectionTitle":"Timeline Showcase Section","linkId":"7dfdb9a7-6316-4101-ba07-d8e31f7cc83a"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"1efccf97-2beb-4f4a-92f0-963f73420cf8","linkId":"1efccf97-2beb-4f4a-92f0-963f73420cf8","name":"Home","folder":null,"paths":{"en":"home","default":"home"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"64e15e31-818a-4692-a4cc-7de616549be6","sectionTitle":"Root Container","linkId":"8d9d5a18-d725-4c44-aa1a-614c2e80df5c"}],"pageUserGroups":[],"title":{"en":"","fr":"Vide | Commencer à partir de zéro"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"ec4a1e30-3808-456b-85bf-2b650fa749a8","linkId":"ec4a1e30-3808-456b-85bf-2b650fa749a8","name":"realtime","folder":null,"paths":{"en":"realtime","default":"realtime"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"d09507a1-6846-43e7-817a-5eeaacd6c1f2","sectionTitle":"Section","linkId":"ec733810-a1f4-42b6-804a-3fb60d0228f7"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"d845d347-1074-450a-8a83-e91df4a5511a","linkId":"d845d347-1074-450a-8a83-e91df4a5511a","name":"ww-pagiantor","folder":null,"paths":{"en":"ww-pagiantor","default":"ww-pagiantor"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"e413d910-f931-4799-ae0b-ab4a448a06dd","sectionTitle":"Header Section","linkId":"95e8d6c2-536e-4594-ad42-00ab466716df"},{"uid":"b0810908-4b03-43cf-a425-1861f7a57245","sectionTitle":"Projects List Section","linkId":"9d97362a-78e8-4129-b027-0484530f7017"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"0b62d36a-00c8-44c5-9166-1c5e0388a5af","linkId":"0b62d36a-00c8-44c5-9166-1c5e0388a5af","name":"ww-map","folder":null,"paths":{"en":"ww-map","default":"ww-map"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"4194cbb2-be02-4ca7-a134-0e0cedb0c399","sectionTitle":"Hero Section","linkId":"cc2363f5-10d6-4898-a217-51d5301ae4c2"},{"uid":"f2d184e3-a921-4125-85f8-c73692e69840","sectionTitle":"Main Content Section","linkId":"c0f560ce-a810-4c16-b3a7-88ad68be33ce"},{"uid":"d35a7d54-f047-4597-b885-ae6b8314106a","sectionTitle":"Footer Strip","linkId":"b859b3f9-f1d1-471c-a334-c9e9c23d9ca0"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"4479b803-1dd5-4793-8813-f2110f47af85","linkId":"4479b803-1dd5-4793-8813-f2110f47af85","name":"ww-breadcrumb","folder":null,"paths":{"en":"ww-breadcrumb","default":"ww-breadcrumb"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"3e089840-9a14-4cdc-8482-84a7f43097b0","sectionTitle":"Page Wrapper","linkId":"42dac83f-f39c-4131-9145-71a46248a360"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"35e63afc-175d-48b0-bbcf-bf0a2698deeb","linkId":"35e63afc-175d-48b0-bbcf-bf0a2698deeb","name":"wwvideoweweb","folder":null,"paths":{"en":"wwvideoweweb","default":"wwvideoweweb"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"73527051-c59b-4d8f-ad8d-6c845b451ee5","sectionTitle":"Hero Section","linkId":"cd75fd4f-2285-4df8-8afc-e38d95faa4d7"},{"uid":"232ba2ed-5b0d-4ad3-a984-2a1f035117b2","sectionTitle":"Main Video Player Section","linkId":"3ab4f9de-827b-45b8-a9ed-07468f195034"},{"uid":"b8ac7145-5310-43ff-bf12-8de85c02bf79","sectionTitle":"Feature Cards Section","linkId":"658be00e-074b-4f6b-b323-79f740cb1c94"},{"uid":"995b1f33-ed78-4c9b-806e-d61a58525ef5","sectionTitle":"Events and Variables Reference Section","linkId":"d3b74c54-f254-4f2d-9b73-fbafb178142f"},{"uid":"ba8e2d3c-e704-4fbf-9a9f-ac89b99eb03e","sectionTitle":"Actions Reference Section","linkId":"a2422e41-ba77-4a24-a51d-959514d42b9a"},{"uid":"81603b33-a754-4e24-a2ad-c847670d7927","sectionTitle":"Best Practices Section","linkId":"debbb1a2-57b7-4d4a-bb0a-5baec317f517"},{"uid":"64be74bd-10db-4416-837c-9a7c98ed10fd","sectionTitle":"Footer Section","linkId":"2e8b8812-b6ca-4a8f-98bb-e9274de7df58"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}}],"plugins":[{"id":"2bd1c688-31c5-443e-ae25-59aa5b6431fb","name":"REST API","namespace":"restApi"}]};
// eslint-disable-next-line no-undef
window.wwg_cacheVersion = 72;
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
