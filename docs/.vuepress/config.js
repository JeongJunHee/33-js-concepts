const { description } = require('../../package');

module.exports = {
  base: '/33-js-concepts/',
  locales: {
    '/': {
      lang: 'ko-KR',
      title: '33 Concepts Every JavaScript Developer Should Know',
      description: description
    }
  },
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ]
  ],
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    activeHeaderLinks: false,
    lastUpdated: false,
    nav: [],
    sidebar: [
      {
        collapsable: false,
        sidebarDepth: 1,
        children: ['/', '/call-stack/']
      }
    ]
  },
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom']
};
