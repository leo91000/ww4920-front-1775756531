import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import path from 'path';
import fs from 'fs';
import { parseEnv } from 'node:util';
import handlebars from 'handlebars';

const pages = {"4e9b5179-6b25-4208-9be4-2b15483c8807-en":{"outputDir":"./date","lang":"en","title":"","cacheVersion":73,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://testdomain.leo-coletta.fr/date/"},{"rel":"alternate","hreflang":"en","href":"https://testdomain.leo-coletta.fr/date/"}]},"65b8411c-495a-452b-8590-f7f6b80819cf-en":{"outputDir":"./ww-4764-preserve-b","lang":"en","title":"","cacheVersion":73,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://testdomain.leo-coletta.fr/ww-4764-preserve-b/"},{"rel":"alternate","hreflang":"en","href":"https://testdomain.leo-coletta.fr/ww-4764-preserve-b/"}]},"4d65a11c-233d-42b9-8319-86386837e73c-en":{"outputDir":"./form-propagation","lang":"en","title":"","cacheVersion":73,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://testdomain.leo-coletta.fr/form-propagation/"},{"rel":"alternate","hreflang":"en","href":"https://testdomain.leo-coletta.fr/form-propagation/"}]},"49ec9525-c547-415c-bc21-2f71f626ecf3-en":{"outputDir":"./ww-4764-preserve-a","lang":"en","title":"","cacheVersion":73,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://testdomain.leo-coletta.fr/ww-4764-preserve-a/"},{"rel":"alternate","hreflang":"en","href":"https://testdomain.leo-coletta.fr/ww-4764-preserve-a/"}]},"2192689d-84b5-4968-8566-4c676eb9d425-en":{"outputDir":"./ww-kanban","lang":"en","title":"","cacheVersion":73,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://testdomain.leo-coletta.fr/ww-kanban/"},{"rel":"alternate","hreflang":"en","href":"https://testdomain.leo-coletta.fr/ww-kanban/"}]},"802a7a1c-a703-4d62-81a0-a1424e3592dd-en":{"outputDir":"./integration-table","lang":"en","title":"","cacheVersion":73,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://testdomain.leo-coletta.fr/integration-table/"},{"rel":"alternate","hreflang":"en","href":"https://testdomain.leo-coletta.fr/integration-table/"}]},"191cf98a-bf77-422f-8c2e-682fd98c1e0c-en":{"outputDir":"./table-view","lang":"en","title":"","cacheVersion":73,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://testdomain.leo-coletta.fr/table-view/"},{"rel":"alternate","hreflang":"en","href":"https://testdomain.leo-coletta.fr/table-view/"}]},"3424c296-9629-4a0c-886f-1e013951ed4c-en":{"outputDir":"./deploy","lang":"en","title":"","cacheVersion":73,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://testdomain.leo-coletta.fr/deploy/"},{"rel":"alternate","hreflang":"en","href":"https://testdomain.leo-coletta.fr/deploy/"}]},"80c39549-1b52-4873-8630-29557ad65b23-en":{"outputDir":"./chagne-variable-value-reporo","lang":"en","title":"","cacheVersion":73,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://testdomain.leo-coletta.fr/chagne-variable-value-reporo/"},{"rel":"alternate","hreflang":"en","href":"https://testdomain.leo-coletta.fr/chagne-variable-value-reporo/"}]},"53b2ac93-07eb-4bf9-89f0-440b7c0e5e20-en":{"outputDir":"./toggle","lang":"en","title":"","cacheVersion":73,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://testdomain.leo-coletta.fr/toggle/"},{"rel":"alternate","hreflang":"en","href":"https://testdomain.leo-coletta.fr/toggle/"}]},"e294552a-7222-4289-bd2a-8836b16fb95a-en":{"outputDir":"./ww-pdf-viewer","lang":"en","title":"","cacheVersion":73,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://testdomain.leo-coletta.fr/ww-pdf-viewer/"},{"rel":"alternate","hreflang":"en","href":"https://testdomain.leo-coletta.fr/ww-pdf-viewer/"}]},"5662da9c-8284-4721-ab45-ed361b83f62e-en":{"outputDir":"./storage","lang":"en","title":"","cacheVersion":73,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://testdomain.leo-coletta.fr/storage/"},{"rel":"alternate","hreflang":"en","href":"https://testdomain.leo-coletta.fr/storage/"}]},"e821ee5d-6726-4555-9d77-1b5b29aae9b1-en":{"outputDir":"./ww-timeline","lang":"en","title":"","cacheVersion":73,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://testdomain.leo-coletta.fr/ww-timeline/"},{"rel":"alternate","hreflang":"en","href":"https://testdomain.leo-coletta.fr/ww-timeline/"}]},"1efccf97-2beb-4f4a-92f0-963f73420cf8-en":{"outputDir":"./","lang":"en","title":"","cacheVersion":73,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://testdomain.leo-coletta.fr/"},{"rel":"alternate","hreflang":"en","href":"https://testdomain.leo-coletta.fr/"}]},"ec4a1e30-3808-456b-85bf-2b650fa749a8-en":{"outputDir":"./realtime","lang":"en","title":"","cacheVersion":73,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://testdomain.leo-coletta.fr/realtime/"},{"rel":"alternate","hreflang":"en","href":"https://testdomain.leo-coletta.fr/realtime/"}]},"d845d347-1074-450a-8a83-e91df4a5511a-en":{"outputDir":"./ww-pagiantor","lang":"en","title":"","cacheVersion":73,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://testdomain.leo-coletta.fr/ww-pagiantor/"},{"rel":"alternate","hreflang":"en","href":"https://testdomain.leo-coletta.fr/ww-pagiantor/"}]},"0b62d36a-00c8-44c5-9166-1c5e0388a5af-en":{"outputDir":"./ww-map","lang":"en","title":"","cacheVersion":73,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://testdomain.leo-coletta.fr/ww-map/"},{"rel":"alternate","hreflang":"en","href":"https://testdomain.leo-coletta.fr/ww-map/"}]},"4479b803-1dd5-4793-8813-f2110f47af85-en":{"outputDir":"./ww-breadcrumb","lang":"en","title":"","cacheVersion":73,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://testdomain.leo-coletta.fr/ww-breadcrumb/"},{"rel":"alternate","hreflang":"en","href":"https://testdomain.leo-coletta.fr/ww-breadcrumb/"}]},"35e63afc-175d-48b0-bbcf-bf0a2698deeb-en":{"outputDir":"./wwvideoweweb","lang":"en","title":"","cacheVersion":73,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://testdomain.leo-coletta.fr/wwvideoweweb/"},{"rel":"alternate","hreflang":"en","href":"https://testdomain.leo-coletta.fr/wwvideoweweb/"}]}};

// Read the main HTML template
const template = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf-8');
const compiledTemplate = handlebars.compile(template);

// Generate an HTML file for each page with its metadata
Object.values(pages).forEach(pageConfig => {
    // Compile the template with page metadata
    const html = compiledTemplate({
        title: pageConfig.title,
        lang: pageConfig.lang,
        meta: pageConfig.meta,
        structuredData: pageConfig.structuredData || null,
        scripts: {
            head: pageConfig.scripts.head,
            body: pageConfig.scripts.body,
        },
        alternateLinks: pageConfig.alternateLinks,
        cacheVersion: pageConfig.cacheVersion,
        baseTag: pageConfig.baseTag,
    });

    // Save output html for each page
    if (!fs.existsSync(pageConfig.outputDir)) {
        fs.mkdirSync(pageConfig.outputDir, { recursive: true });
    }
    fs.writeFileSync(`${pageConfig.outputDir}/index.html`, html);
});

const rolldownOptionsInput = {};
for (const pageName in pages) {
    rolldownOptionsInput[pageName] = path.resolve(__dirname, pages[pageName].outputDir, 'index.html');
}

function getFrontEnvironmentValues(root, mode) {
    const filePath = path.resolve(root, `.env.${mode}`);
    if (!fs.existsSync(filePath)) {
        return {};
    }

    return Object.fromEntries(Object.entries(parseEnv(fs.readFileSync(filePath, 'utf8'))).filter(([key]) => !key.startsWith('VITE_')));
}

export default defineConfig(() => {
    return {
        plugins: [vue()],
        base: "/",
        define: {
            global: 'globalThis',
            __WW_FRONT_ENV_VARIABLES__: JSON.stringify({
                staging: getFrontEnvironmentValues(__dirname, 'staging'),
                production: getFrontEnvironmentValues(__dirname, 'production'),
            }),
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
            postcss: {
                plugins: [autoprefixer],
            },
        },
        build: {
            chunkSizeWarningLimit: 10000,
            rolldownOptions: {
                input: rolldownOptionsInput,
                onwarn: (entry, next) => {
                    if (entry.loc?.file && /js$/.test(entry.loc.file) && /Use of eval in/.test(entry.message)) return;
                    if (/Use of direct `eval`/.test(entry.message)) return;
                    return next(entry);
                },
            },
        },
        logLevel: 'warn',
    };
});
