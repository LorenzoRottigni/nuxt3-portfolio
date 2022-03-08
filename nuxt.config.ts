import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  head: {
    title: "nuxt-portfolio-v4",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css",
      },
    ],
    script: [
      {
        src: "https://cdn.lordicon.com/lusqsztk.js",
      },
    ],
    // META IMPORT NOT WORKING !!
    /*link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
          { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' },
          { rel: 'preconnect', href: 'https://fonts.googleapis.com'},
          { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'true'},
          { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'}
        ]*/
  },
  css: ["@/assets/sass/app.sass"],
  modules: ["bootstrap-vue/nuxt"],
  build: {},
  components: true,
});
