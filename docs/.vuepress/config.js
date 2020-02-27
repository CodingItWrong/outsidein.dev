module.exports = {
  title: 'AgileFrontend.dev',
  themeConfig: {
    sidebar: [
      ['/why-tdd', 'Why TDD?'],
      ['/outside-in-tdd', 'Overview'],
      '/exercise-intro',
      {
        title: 'Vue',
        children: [
          '/vue/0-intro',
          '/vue/1-setup',
          '/vue/2-vertical-slice',
          '/vue/3-refactoring-styles',
          '/vue/4-edge-cases',
          '/vue/5-writing-data',
        ],
      },
      {
        title: 'React',
        children: [
          '/react/0-intro',
          '/react/1-setup',
          '/react/2-vertical-slice',
          '/react/3-refactoring-styles',
          '/react/4-edge-cases',
          '/react/5-writing-data',
        ],
      },
    ],
  },
};
