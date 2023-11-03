// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  ssr: false,
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  nitro: {
    preset: 'node-server',
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    define: {
      'process.env.DEBUG': false,
    },
    server: {
      watch: {
        usePolling: true,
      },
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
    },
  },
  runtimeConfig: {
    public: {
      HOST_NAME: process.env.HOSTNAME || 'localhost',
      NODE_VERSION: process.env.NODE_VERSION,
    },
  },
});
