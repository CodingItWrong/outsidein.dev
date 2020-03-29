module.exports = {
  title: 'Outside-In Frontend Development',
  head: [
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'msapplication-TileColor', content: '#00c853' }],
    ['meta', { name: 'theme-color', content: '#00c853' }],
  ],
  themeConfig: {
    logo: '/logo-36@3x.gif',
    nav: [
      { text: 'Chat', link: 'https://gitter.im/outsideindev/community' },
    ],
    sidebar: [
      '/about-this-guide',
      {
        title: 'Concepts',
        children: [
          '/why-agile',
          '/testing-concepts',
          ['/why-tdd', 'Why TDD?'],
          ['/outside-in-tdd', 'Outside-In TDD'],
        ]
      },
      {
        title: 'Exercise',
        children: [
          '/exercise-intro',
          {
            title: 'Vue',
            children: [
              '/vue/',
              '/vue/2-project-setup',
              '/vue/3-vertical-slice',
              '/vue/4-refactoring-styles',
              '/vue/5-edge-cases',
              '/vue/6-writing-data',
            ],
          },
          {
            title: 'React',
            children: [
              '/react/',
              '/react/2-project-setup',
              '/react/3-vertical-slice',
              '/react/4-refactoring-styles',
              '/react/5-edge-cases',
              '/react/6-writing-data',
            ],
          },
          '/exercise-wrap-up',
        ]
      },
      '/next-steps',
    ],
  },
};
