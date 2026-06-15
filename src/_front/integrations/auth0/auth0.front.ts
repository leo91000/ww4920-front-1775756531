import { createAuth0Client, Auth0Client } from '@auth0/auth0-spa-js';
import { useBackAuthStore } from '@/pinia/backAuth.js';

function getPageUrl(pageConfig: any = {}) {
    if (pageConfig.type === 'internal') {
        const pageId = pageConfig.pageId;
        return wwLib.manager
            ? `${window.location.origin}/${pageId}`
            : `${window.location.origin}${wwLib.wwPageHelper.getPagePath(pageId)}`;
    } else {
        return pageConfig.url;
    }
}

async function syncAuthState(instance: Auth0Client) {
    const backAuthStore = useBackAuthStore(wwLib.$pinia);

    const isAuthenticated = await instance.isAuthenticated();
    if (!isAuthenticated) {
        backAuthStore.setAuthUser(null);
        return null;
    }

    const user = await instance.getUser();
    const accessToken = await instance.getTokenSilently();
    const idTokenClaims = await instance.getIdTokenClaims();

    await backAuthStore.setAuthSession(
        { access_token: accessToken, id_token: idTokenClaims?.__raw || null },
        { persist: true }
    );
    backAuthStore.setAuthUser(user);
    return user;
}

export default {
    connection: {
        init: async ({ connection }) => {
            if (!connection) throw new Error('Auth0 connection is required');

            const config = connection.config;
            const domain = config.customDomain || config.domain;
            const clientId = config.SPAClientId;

            if (!domain || !clientId) throw new Error('Auth0 domain and SPA Client ID are required');

            const client = await createAuth0Client({
                domain,
                clientId,
                authorizationParams: {
                    audience: config.audience || undefined,
                    scope: 'openid profile email',
                },
                useRefreshTokens: true,
                cacheLocation: 'localstorage',
            });

            const backAuthStore = useBackAuthStore(wwLib.$pinia);
            if (backAuthStore.connectionId === connection.id) {
                const _window = wwLib.manager ? wwLib.getEditorWindow() : wwLib.getFrontWindow();
                const params = new URLSearchParams(_window.location.search);
                if (params.has('state') && (params.has('code') || params.has('error'))) {
                    try {
                        await client.handleRedirectCallback();
                    } catch (err) {
                        wwLib.wwLog.error('[Auth0] handleRedirectCallback error:', err);
                    } finally {
                        const url = new URL(_window.location.href);
                        url.searchParams.delete('code');
                        url.searchParams.delete('state');
                        url.searchParams.delete('error');
                        url.searchParams.delete('error_description');
                        _window.history.replaceState({}, '', url.toString());
                    }
                }
            }

            return client;
        },
    },
    hooks: {
        'auth-refresh': async ({ instance }: { instance?: Auth0Client } = {}) => {
            if (!instance) return;
            await syncAuthState(instance);
        },
    },
    actions: {
        'login-with-redirect': async ({ args }, { instance }: { instance: Auth0Client }) => {
            if (!instance) throw new Error('Auth0 instance is required');

            const rawScope = args.authorizationParams?.scope;
            const additionalScopes = Array.isArray(rawScope) ? rawScope.join(' ') : rawScope;
            const authorizationParams = {
                ...args.authorizationParams,
                scope: additionalScopes ? `openid profile email ${additionalScopes}` : undefined,
                ...(args.authorizationParams?.redirect_uri && {
                    redirect_uri: getPageUrl(args.authorizationParams.redirect_uri),
                }),
            };

            /* wwFront:start */
            return instance.loginWithRedirect({ authorizationParams });
            /* wwFront:end */
         },
        'login-with-popup': async ({ args }, { instance }: { instance: Auth0Client }) => {
            if (!instance) throw new Error('Auth0 instance is required');

            const rawScope = args.authorizationParams?.scope;
            const additionalScopes = Array.isArray(rawScope) ? rawScope.join(' ') : rawScope;

            await instance.loginWithPopup({
                authorizationParams: {
                    ...args.authorizationParams,
                    scope: additionalScopes ? `openid profile email ${additionalScopes}` : undefined,
                },
            });

            return syncAuthState(instance);
        },
        logout: async ({ args }, { instance }: { instance: Auth0Client }) => {
            if (!instance) throw new Error('Auth0 instance is required');

            const backAuthStore = useBackAuthStore(wwLib.$pinia);
            await backAuthStore.clearAuthSession();

            const logoutParams = {
                ...args.logoutParams,
                ...(args.logoutParams?.returnTo && { returnTo: getPageUrl(args.logoutParams.returnTo) }),
            };

            return instance.logout({
                logoutParams,
                openUrl: args.openUrl,
            });
        },
        'get-user': async (_, { instance }: { instance: Auth0Client }) => {
            if (!instance) throw new Error('Auth0 instance is required');

            const user = await instance.getUser();
            const backAuthStore = useBackAuthStore(wwLib.$pinia);
            backAuthStore.setAuthUser(user);

            return user;
        },
        'get-token-silently': async ({ args }, { instance }: { instance: Auth0Client }) => {
            if (!instance) throw new Error('Auth0 instance is required');

            const rawScope = args.authorizationParams?.scope;
            const additionalScopes = Array.isArray(rawScope) ? rawScope.join(' ') : rawScope;

            return instance.getTokenSilently({
                authorizationParams: {
                    ...args.authorizationParams,
                    scope: additionalScopes ? `openid profile email ${additionalScopes}` : undefined,
                },
                cacheMode: args.cacheMode,
            });
        },
        'change-password': async ({ args }, { connection }) => {
            const config = connection.config;
            const domain = config.customDomain || `https://${config.domain}`;

            return await fetch(`${domain}/dbconnections/change_password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    client_id: config.SPAClientId,
                    email: args.email,
                    connection: args.connection,
                }),
            });
        },
    },
};
