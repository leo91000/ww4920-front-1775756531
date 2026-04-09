import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import path from 'path';
import fs from 'fs';
import { parseEnv } from 'node:util';
import handlebars from 'handlebars';

const pages = {"storage":{"outputDir":"./storage","lang":"en","title":"","cacheVersion":57,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://faa5ce34-1579-45df-b65a-564710de0c3d.undefined/storage/"},{"rel":"alternate","hreflang":"en","href":"https://faa5ce34-1579-45df-b65a-564710de0c3d.undefined/storage/"}]},"integration-table":{"outputDir":"./integration-table","lang":"en","title":"","cacheVersion":57,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://faa5ce34-1579-45df-b65a-564710de0c3d.undefined/integration-table/"},{"rel":"alternate","hreflang":"en","href":"https://faa5ce34-1579-45df-b65a-564710de0c3d.undefined/integration-table/"}]},"table-view":{"outputDir":"./table-view","lang":"en","title":"","cacheVersion":57,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://faa5ce34-1579-45df-b65a-564710de0c3d.undefined/table-view/"},{"rel":"alternate","hreflang":"en","href":"https://faa5ce34-1579-45df-b65a-564710de0c3d.undefined/table-view/"}]},"deploy":{"outputDir":"./deploy","lang":"en","title":"","cacheVersion":57,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://faa5ce34-1579-45df-b65a-564710de0c3d.undefined/deploy/"},{"rel":"alternate","hreflang":"en","href":"https://faa5ce34-1579-45df-b65a-564710de0c3d.undefined/deploy/"}]},"test":{"outputDir":"./test","lang":"en","title":"","cacheVersion":57,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://faa5ce34-1579-45df-b65a-564710de0c3d.undefined/test/"},{"rel":"alternate","hreflang":"en","href":"https://faa5ce34-1579-45df-b65a-564710de0c3d.undefined/test/"}]},"index":{"outputDir":"./","lang":"en","title":"","cacheVersion":57,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://faa5ce34-1579-45df-b65a-564710de0c3d.undefined/"},{"rel":"alternate","hreflang":"en","href":"https://faa5ce34-1579-45df-b65a-564710de0c3d.undefined/"}]},"realtime":{"outputDir":"./realtime","lang":"en","title":"","cacheVersion":57,"meta":[{"name":"twitter:card","content":"summary"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://faa5ce34-1579-45df-b65a-564710de0c3d.undefined/realtime/"},{"rel":"alternate","hreflang":"en","href":"https://faa5ce34-1579-45df-b65a-564710de0c3d.undefined/realtime/"}]}};

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
