import type { XanoClient as XanoClientType } from '@xano/js-sdk';
import { XanoClient } from '@xano/js-sdk';
import { getValue } from '@/_common/helpers/code/customCode.js';
import { useBackAuthStore } from '@/pinia/backAuth.js';
import { executeWorkflows } from '@/_common/helpers/data/workflows.js';

function getInstanceBaseUrl(connection: any): string {
    return connection?.config?.customDomain || `https://${connection?.config?.instanceBaseDomain}`;
}

function buildPath(template: string, pathParams: Record<string, any> = {}): string {
    let path = template;
    for (const [key, value] of Object.entries(pathParams)) {
        path = path.replace(`{${key}}`, encodeURIComponent(String(value)));
    }
    return path;
}

export default {
    hooks: {
        'auth-refresh': async ({ session, instance }: { session?: any; instance?: XanoClientType } = {}) => {
            instance?.setAuthToken?.(session?.accessToken || null);
            await executeWorkflows('xano/auth-refresh', { event: { session } });
        },
    },

    connection: {
        init: async ({ connection }: { connection: any }) => {
            if (!connection) throw new Error('Xano connection is required');

            const baseUrl = getInstanceBaseUrl(connection);
            if (!baseUrl) throw new Error('Xano instance domain is not configured');

            const client = new XanoClient({
                instanceBaseUrl: baseUrl,
                dataSource: connection.config.xDataSource || undefined,
                realtimeConnectionHash: connection.config.realtimeConnectionHash || undefined,
                customAxiosRequestConfig: {
                    headers: {
                        ...(connection.config.globalHeaders || {}),
                        'X-Branch': connection.config.xBranch,
                    },
                },
            });

            const backAuthStore = useBackAuthStore(wwLib.$pinia);
            if (backAuthStore.session?.accessToken) {
                client.setAuthToken(backAuthStore.session.accessToken);
            }

            return client;
        },
    },

    async loadView({ tableConfig, viewConfig = {}, parameters = {}, instance }: any) {
        if (!instance) throw new Error('Xano instance is required');

        const processedViewConfig = getValue(viewConfig, { parameters });

        const pathParams = { ...(tableConfig.params || {}), ...(processedViewConfig.params || {}) };
        const rawQueryParams = { ...(tableConfig.query || {}), ...(processedViewConfig.query || {}) };
        const queryParams: Record<string, any> = {};
        for (const [key, value] of Object.entries(rawQueryParams)) {
            if (value !== undefined && value !== null && value !== '') {
                queryParams[key] = value;
            }
        }
        const headers = { ...(tableConfig.headers || {}), ...(processedViewConfig.headers || {}) };

        const path = buildPath(tableConfig.endpoint.path, pathParams);
        const endpoint = `/api:${tableConfig.apiGroupCanonical}${path}`;

        const response = await instance.get(endpoint, queryParams, headers);
        const body = response.getBody();

        const isPaginated = body && !Array.isArray(body) && Array.isArray(body.items) && 'curPage' in body;

        return {
            data: isPaginated ? body.items : body,
            metadata: isPaginated ? { ...body, items: undefined } : {},
        };
    },

    actions: {
        request: async ({ args }, { instance }: { instance: XanoClientType }) => {
            if (!instance) throw new Error('Xano instance is required');

            const { apiGroupCanonical, endpoint, params, query, body, headers, __wwstream } = args;

            const path = buildPath(endpoint.path, params || {});
            const fullEndpoint = `/api:${apiGroupCanonical}${path}`;
            const method = endpoint.method.toLowerCase() as string;
            const payload = method === 'get' ? query || {} : body;

            if (__wwstream && ['get', 'post', 'patch', 'put'].includes(method)) {
                const encoder = new TextEncoder();
                return new ReadableStream<Uint8Array>({
                    start(controller) {
                        const streamingCallback = (eventStream: any) => {
                            const data = JSON.stringify(eventStream.dataAsJSON?.() ?? eventStream.data);
                            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
                        };

                        instance[method](fullEndpoint, payload, headers || {}, streamingCallback)
                            .then(() => controller.close())
                            .catch((err: any) => controller.error(err));
                    },
                });
            }

            return await instance[method](fullEndpoint, payload, headers || {});
        },
        'auth-set-user': async ({ args }) => {
            const backAuthStore = useBackAuthStore(wwLib.$pinia);
            await backAuthStore.setAuthUser(args.user);
        },
        'auth-set-session': async ({ args }, { instance }: { instance: XanoClientType }) => {
            if (!instance) throw new Error('Xano instance is required');

            const backAuthStore = useBackAuthStore(wwLib.$pinia);
            await backAuthStore.setAuthSession(
                {
                    accessToken: args.authToken,
                    refreshToken: args.refreshToken,
                    metadata: args.metadata,
                },
                {
                    persist: args.persist,
                    refresh: true,
                }
            );

            instance.setAuthToken(args.authToken || null);
        },
        'auth-clear-session': async ({ args: _ }, { instance }: { instance: XanoClientType }) => {
            if (!instance) throw new Error('Xano instance is required');

            const backAuthStore = useBackAuthStore(wwLib.$pinia);
            await backAuthStore.clearAuthSession();
            instance.setAuthToken(null);
        },
    },
};
