// @ts-ignore
export default defineNuxtConfig({
  devtools: {enabled: false},
  ssr: false,
  css: ['~/assets/app.scss'],
  modules: ["@pinia/nuxt", "@vite-pwa/nuxt", "nuxt3-leaflet", "nuxt-primevue"],

  primevue: {
      options: {ripple: true,},
      components: {
          include: ['Dialog', 'Button', 'InputText', "Dropdown", "ProgressBar", "Accordion", 'InputNumber', 'Checkbox',
              "RadioButton", "Textarea", "AutoComplete", 'MultiSelect',
              "ProgressSpinner", "Password", 'Badge', 'SelectButton', "Knob",'DynamicDialog','FileUpload' ]
      },
      directives: {
          include: ['Ripple', 'Tooltip', 'StyleClass', 'Avatar']
      },
      css: ['primevue/resources/themes/aura-light-green/theme.css']
  },

  pwa: {
      workbox: {globPatterns: ['**/*.{js,css,html,png,svg,ico}']},
      injectManifest: {globPatterns: ['**/*.{js,css,html,png,svg,ico}']},
      registerType: 'autoUpdate',
      manifest: {
          "name": " نظارت  کارافرینی ",
          "short_name": " نظارت کارافرینی  ",
          "lang": "en",
          "start_url": "/",
          "display": "standalone",
          "background_color": "#000000",
          "theme_color": "#14213D",
          icons: [
              {
                  "src": "/icons/android-chrome-57x57.png",
                  "sizes": "57x57",
                  "type": "image/png"
              },
              {
                  "src": "/icons/android-chrome-72x72.png",
                  "sizes": "72x72",
                  "type": "image/png"
              },
              {
                  "src": "/icons/android-chrome-114x114.png",
                  "sizes": "114x114",
                  "type": "image/png"
              },
              {
                  "src": "/icons/android-chrome-144x144.png",
                  "sizes": "144x144",
                  "type": "image/png"
              },
              {
                  "src": "/icons/android-chrome-192x192.png",
                  "sizes": "192x192",
                  "type": "image/png"
              },
              {
                  "src": "/icons/android-chrome-512x512.png",
                  "sizes": "512x512",
                  "type": "image/png"
              },
              {
                  "src": "/icons/android-chrome-maskable-57x57.png",
                  "sizes": "57x57",
                  "type": "image/png",
                  "purpose": "maskable"
              },
              {
                  "src": "/icons/android-chrome-maskable-72x72.png",
                  "sizes": "72x72",
                  "type": "image/png",
                  "purpose": "maskable"
              },
              {
                  "src": "/icons/android-chrome-maskable-144x144.png",
                  "sizes": "144x144",
                  "type": "image/png",
                  "purpose": "maskable"
              },
              {
                  "src": "/icons/android-chrome-maskable-192x192.png",
                  "sizes": "192x192",
                  "type": "image/png",
                  "purpose": "maskable"
              },
              {
                  "src": "/icons/android-chrome-maskable-512x512.png",
                  "sizes": "512x512",
                  "type": "image/png",
                  "purpose": "maskable"
              }
          ]
      },

      devOptions: {
          enabled: true,
          type: "module",
      },
  },

  client: {
          installPrompt: true,
          beforeinstallprompt:true
      },

  runtimeConfig: {
      public: {
          base_API: process.env.base_API,
          surveyUrl: process.env.surveyUrl,
          mediaUrl: process.env.mediaUrl,
          securityUrl: process.env.securityUrl,
      },
  },

    components: {
        global: true,
        dirs: [
            {
                path: '~/components',
                pathPrefix: false,
            },
            {
                path: '~/composables',
                pathPrefix: false,
            }
        ],
    },


    imports: {
        autoImport: true,
    },

  app: {
      head: {
          title: "اپلیکیشن نظارت کارافرینی  ",
          meta: [
              {charset: "utf-8"},
              {name: "viewport", content: "width=device-width, initial-scale=1"},
              {hid: "description", name: "description", content: "Nuxt Argon Dashboard 2 PRO by Creative Tim"},
          ],
          link: [
              {rel: "icon", type: "image/x-icon", href: "/icons/android-chrome-16x16.png"},
          ],
          script: [],
      },
  },
    // devServer: {
    //     https: true
    // },

  compatibilityDate: "2024-07-15",
});