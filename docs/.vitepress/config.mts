import { defineConfig } from 'vitepress'
import {en} from './en.mjs'
import {zh} from './zh.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Knowledge Project",
  description: "A Knowledge Site",
  srcDir: 'src',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' }
    // ],
    //
    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    search: {
      provider: 'local'
    },
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      ...zh,
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      ...en,
    },
  }
})
