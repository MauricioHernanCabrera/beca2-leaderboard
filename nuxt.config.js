import config from "./config";
import packageJson from "./package.json";

const page = {
  title: "Leaderboard Beca2",
  short_name: "Leaderboard Beca2",
  description: "Tabla actual de posiciones en beca2",
  safeImg: {
    url: `${config.frontUrl}/images/safe_image.jpg`,
    alt: "Image of Leaderboard Beca2"
  },
  favicon: `${config.frontUrl}/images/logo.ico`,
  author: `Mauricio Hernan Cabrera`
};

export default {
  env: { ...config, version: packageJson.version },

  target: "static",

  router: {
    base: "/beca2-leaderboard/"
  },

  server: {
    port: config.port
  },

  head: {
    title: page.title,

    htmlAttrs: {
      lang: "en"
    },

    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=no"
      },
      { hid: "author", name: "author", content: `${page.author}` },
      {
        hid: "description",
        name: "description",
        content: `${page.description}`
      },
      { hid: "twitter-card", name: "twitter:card", content: "summary" },
      { hid: "twitter-title", name: "twitter:title", content: `${page.title}` },
      {
        hid: "twitter-description",
        name: "twitter:description",
        content: `${page.description}`
      },

      {
        hid: "twitter-image",
        name: "twitter:image",
        content: `${page.safeImg.url}`
      },
      {
        hid: "twitter-image-alt",
        name: "twitter:image:alt",
        content: `${page.safeImg.alt}`
      },
      { hid: "og-type", property: "og:type", content: "website" },
      { hid: "og-title", property: "og:title", content: `${page.title}` },
      { hid: "og-image", property: "og:image", content: `${page.safeImg.url}` },
      {
        hid: "og-site_name",
        property: "og:site_name",
        content: `${page.title}`
      },
      {
        hid: "og-description",
        property: "og:description",
        content: `${page.description}`
      }
    ],

    link: [
      { rel: "icon", type: "image/x-icon", href: page.favicon },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com"
      },
      {
        href:
          "https://fonts.googleapis.com/css2?family=Changa+One:ital@0;1&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
        rel: "stylesheet"
      }
    ]
  },

  css: ["@/assets/scss/styles.scss"],

  plugins: [],

  components: false,

  buildModules: ["@nuxtjs/vuetify"],

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "cookie-universal-nuxt",
    "@nuxtjs/apollo"
  ],

  apollo: {
    clientConfigs: {
      default: {
        // httpEndpoint: "https://axieinfinity.com/graphql-server-v2/graphql"
        httpEndpoint: "https://graphql-gateway.axieinfinity.com/graphql"
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  manifest: {
    name: page.title,
    short_name: page.short_name,
    lang: "en-US",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#1976D2",
    theme_color: "#115293"
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],

    defaultAssets: {
      font: false
    },

    theme: {
      dark: true,
      themes: {
        dark: {
          primary: "#4ED6DE",
          secondary: "#FB8C00",
          success: "#4CAF50",
          warning: "#FB8C00",
          error: "#FF5252",
          info: "#1867C0",
          light: "#FFFFFF",
          dark: "#212121"
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
