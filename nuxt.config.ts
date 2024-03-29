// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    'nuxt-icons',
  ],
  build: {
    transpile: ['trpc-nuxt']
  },
})
