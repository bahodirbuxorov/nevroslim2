export default defineNuxtConfig({
  runtimeConfig: {
    telegramBotToken: '',
    telegramChatId: '',
    bitrixWebhookUrl: ''
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    'nuxt-marquee'
  ],

  ssr: false,

  devtools: {
    enabled: false
  },

  sourcemap: {
    client: false,
    server: false
  },

  app: {
    head: {
      title: 'Асаб касалликларидан халос бўлишни истайсизми ?',
      meta: [
        {
          name: 'description',
          content: 'Болалардазехн ва хотирани кучайтиради , Бўшашиш ва йиғлоқилик , Суякларини мустахкамлайди , Асабларини тинчлантириб беради , Сўз ёдлаш қобилияти , Кайфиятни кўтариб уйқуни яхшилайди , Мияда қон айланишни яхшилайди ,Юрак оғриғи ва юрак ўйнашида фойдали , Қон босимиортиши ва қабзиятда самарали'
        },
        {
          property: 'og:title',
          content: 'Асаб касалликларидан халос бўлишни истайсизми ?'
        },
        {
          property: 'og:description',
          content: 'Болалардазехн ва хотирани кучайтиради , Бўшашиш ва йиғлоқилик , Суякларини мустахкамлайди , Асабларини тинчлантириб беради , Сўз ёдлаш қобилияти , Кайфиятни кўтариб уйқуни яхшилайди , Мияда қон айланишни яхшилайди ,Юрак оғриғи ва юрак ўйнашида фойдали , Қон босимиортиши ва қабзиятда самарали'
        },
        { property: 'og:image', content: '/png/screenshot.png' },
        { property: 'og:url', content: 'https://nevroslim.uz' },
        { property: 'og:type', content: 'website' },
        { name: 'referrer', content: 'strict-origin-when-cross-origin' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Асаб касалликларидан халос бўлишни истайсизми ?' },
        {
          name: 'twitter:description',
          content: 'Болалардазехн ва хотирани кучайтиради , Бўшашиш ва йиғлоқилик , Суякларини мустахкамлайди , Асабларини тинчлантириб беради , Сўз ёдлаш қобилияти , Кайфиятни кўтариб уйқуни яхшилайди , Мияда қон айланишни яхшилайди ,Юрак оғриғи ва юрак ўйнашида фойдали , Қон босимиортиши ва қабзиятда самарали'
        },
        { name: 'twitter:image', content: '/png/screenshot.png' },
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' }
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      htmlAttrs: {
        lang: 'uz'
      },
      script: [
        {
          innerHTML: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('set', 'autoConfig', false, '1769019931215277');
fbq('init', '1769019931215277');
fbq('track', 'PageView');`,
          type: 'text/javascript',
          tagPosition: 'head'
        }
      ],
      noscript: [
        {
          innerHTML: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1769019931215277&ev=PageView&noscript=1" />`,
          tagPosition: 'bodyOpen'
        }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  ui: {
    colorMode: false
  },

  routeRules: {
    '/': {
      prerender: true,
      headers: {
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'X-Content-Type-Options': 'nosniff'
      }
    }
  },

  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      nodeCompat: true
    },
    compressPublicAssets: true
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
