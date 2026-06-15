import { defineStore } from 'pinia';
import { ref, shallowReactive } from 'vue';
 import integrationCore from '@/_front/integrations/index.js';
import { resolveConnection } from '@/_common/helpers/code/connnections.js';
 
export const NATIVE_INTEGRATIONS = ['http-request', 'weweb-auth', 'weweb-storage', 'custom-auth'];

export const useIntegrationsStore = defineStore('integrations', () => {
    const installed = ref([...NATIVE_INTEGRATIONS]);
    const connections = ref({});
    /* wwFront:start */
    // eslint-disable-next-line no-undef
    connections.value = {"b23555ab-6ef8-44d6-8335-22ba10897aed":{"id":"b23555ab-6ef8-44d6-8335-22ba10897aed","name":"Airtable connection","integration":"airtable","config":{"personalAccessToken":{"__envVariableKey":"AIRTABLE_PERSONAL_ACCESS_TOKEN"}}},"3344e166-9a0d-4fa1-b616-3c04ffd13955":{"id":"3344e166-9a0d-4fa1-b616-3c04ffd13955","name":"Weweb","integration":"openai","config":{"apiKey":{"__envVariableKey":"OPENAI_API_KEY"}}},"509e3a66-4e0b-45d0-91a2-ce330bd0e982":{"id":"509e3a66-4e0b-45d0-91a2-ce330bd0e982","name":"Personal","integration":"openai","config":{"apiKey":{"__envVariableKey":"OPENAI_API_KEY_1"}}},"83001b71-c4a3-4617-a1f9-030159df2481":{"id":"83001b71-c4a3-4617-a1f9-030159df2481","name":"Supabase connection","integration":"supabase","config":{"branchRef":{"__envVariableKey":"SUPABASE_PROJECT_BRANCH_REF"},"secretKey":{"__envVariableKey":"SUPABASE_SECRET_KEY"},"projectRef":{"__envVariableKey":"SUPABASE_PROJECT_REF"},"accessToken":{"__envVariableKey":"SUPABASE_ACCESS_TOKEN"},"secretKeyId":{"editorValue":"801e5950-a3ea-4fc7-9be0-ed8bde4ec65b","stagingValue":"","productionValue":""},"customDomain":{"__envVariableKey":"SUPABASE_CUSTOM_DOMAIN"},"refreshToken":{"__envVariableKey":"SUPABASE_REFRESH_TOKEN"},"publishableKey":{"__envVariableKey":"SUPABASE_PUBLISHABLE_KEY"}}},"fb481ef1-b47b-4a3d-911a-d57ca3b90638":{"id":"fb481ef1-b47b-4a3d-911a-d57ca3b90638","name":"AWS S3 connection","integration":"aws-s3","config":{"region":{"__envVariableKey":"AWS_S3_REGION"},"accessKeyId":{"__envVariableKey":"AWS_S3_ACCESS_KEY_ID"},"secretAccessKey":{"__envVariableKey":"AWS_S3_SECRET_ACCESS_KEY"}}},"34b4d4f6-d4d2-4ab2-a9fc-a9b2d8b5d8e9":{"id":"34b4d4f6-d4d2-4ab2-a9fc-a9b2d8b5d8e9","name":"Broken","integration":"openai","config":{"apiKey":{"__envVariableKey":"OPENAI_API_KEY_2"}}},"4c78b99d-c422-4169-9a3c-d9270599299f":{"id":"4c78b99d-c422-4169-9a3c-d9270599299f","name":"Resend connection","integration":"resend","config":{"apiKey":{"__envVariableKey":"RESEND_API_KEY"}}},"40e6d115-5b0e-44b7-a1e1-d9f48cf50649":{"id":"40e6d115-5b0e-44b7-a1e1-d9f48cf50649","name":"Weweb","integration":"supabase","config":{"branchRef":{"__envVariableKey":"SUPABASE_PROJECT_BRANCH_REF_1"},"secretKey":{"__envVariableKey":"SUPABASE_SECRET_KEY_1"},"projectRef":{"__envVariableKey":"SUPABASE_PROJECT_REF_1"},"accessToken":{"__envVariableKey":"SUPABASE_ACCESS_TOKEN_1"},"secretKeyId":{"editorValue":"1d5598e1-e0b6-4898-97f2-d4d94acf4532","stagingValue":"","productionValue":""},"customDomain":{"__envVariableKey":"SUPABASE_CUSTOM_DOMAIN_1"},"refreshToken":{"__envVariableKey":"SUPABASE_REFRESH_TOKEN_1"},"publishableKey":{"__envVariableKey":"SUPABASE_PUBLISHABLE_KEY_1"}}},"684cce88-bb59-47e0-a8b0-b558caf60a03":{"id":"684cce88-bb59-47e0-a8b0-b558caf60a03","name":"Stripe connection","integration":"stripe","config":{"webhookPath":{"__envVariableKey":"STRIPE_WEBHOOK_ENDPOINT"},"publicApiKey":{"__envVariableKey":"STRIPE_PUBLISHABLE_KEY"},"secretApiKey":{"__envVariableKey":"STRIPE_SECRET_KEY"},"webhookEnabled":{"__envVariableKey":"STRIPE_WEBHOOK_ENABLE"},"webhookSecretKey":{"__envVariableKey":"STRIPE_WEBHOOK_SECRET_KEY"}}},"64078dc3-d25b-45df-9ec4-5b1f1053dcc4":{"id":"64078dc3-d25b-45df-9ec4-5b1f1053dcc4","name":"Fake Auth0 connection","integration":"auth0","config":{"domain":{"editorValue":"fake-auth0.localhost","stagingValue":"fake-auth0.localhost","productionValue":"fake-auth0.localhost","__envVariableKey":"AUTH0_DOMAIN"},"audience":{"editorValue":"https://fake-api.localhost","stagingValue":"https://fake-api.localhost","productionValue":"https://fake-api.localhost","__envVariableKey":"AUTH0_AUDIENCE"},"M2MClientId":{"secure":true,"editorValue":"fake-m2m-client-id","stagingValue":"fake-m2m-client-id","productionValue":"fake-m2m-client-id","__envVariableKey":"AUTH0_M2M_CLIENT_ID"},"SPAClientId":{"editorValue":"fake-spa-client-id","stagingValue":"fake-spa-client-id","productionValue":"fake-spa-client-id","__envVariableKey":"AUTH0_SPA_CLIENT_ID"},"customDomain":{"editorValue":"","stagingValue":"","productionValue":"","__envVariableKey":"AUTH0_CUSTOM_DOMAIN"},"M2MClientSecret":{"secure":true,"editorValue":"fake-m2m-client-secret","stagingValue":"fake-m2m-client-secret","productionValue":"fake-m2m-client-secret","__envVariableKey":"AUTH0_M2M_CLIENT_SECRET"}}}};
    /* wwFront:end */
    const instances = {};
 
    async function initializeConnectionInstance(connectionId) {
        const rawConnection = connections.value[connectionId];
        if (!rawConnection) return;

        const connection = resolveConnection(rawConnection);
        if (!connection) return;

        const integration = integrationCore[connection.integration];
        if (!integration?.connection?.init) return;

        try {
            const instance = await integration.connection.init({ connection });
            instances[connectionId] = instance;
        } catch (error) {
            wwLib.wwLog?.error('Failed to initialize connection instance', error);
        }
    }

    async function initializeIntegrationInstance(integrationKey) {
        const integration = integrationCore[integrationKey];
        if (!integration?.init) return;

        try {
            const instance = await integration.init();
            instances[integrationKey] = instance;
        } catch (error) {
            wwLib.wwLog?.error('Failed to initialize integration instance', error);
        }
    }

    async function initializeInstances() {
        for (const integrationKey of installed.value) {
            await initializeIntegrationInstance(integrationKey);
        }

        for (const connectionId in connections.value) {
            await initializeConnectionInstance(connectionId);
        }
    }

 
    return {
        installed,
        connections,
        getInstance(id) {
            return instances[id] || null;
        },
        getConnection(connectionId) {
            if (!connectionId) return null;
            const connection = connections.value[connectionId];
            if (!connection) return null;
            return resolveConnection(connection);
        },
        initializeInstances,
        initializeConnectionInstance,
         addIntegration(integration) {
            if (!integration) return;
            if (!installed.value.includes(integration)) {
                installed.value.push(integration);
            }
        },
        removeIntegration(integration) {
            const index = installed.value.indexOf(integration);
            if (index !== -1) {
                installed.value.splice(index, 1);
            }

            if (instances[integration]) {
                delete instances[integration];
            }
        },
        addConnection(connection) {
            if (!connection?.id) return;
            connections.value[connection.id] = connection;
        },
     };
});
