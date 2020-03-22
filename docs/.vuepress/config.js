module.exports = {
  title: 'AgileFrontend.dev',
  themeConfig: {
    sidebar: [
      '/about-this-guide',
      '/why-agile',
      ['/why-tdd', 'Why TDD?'],
      ['/outside-in-tdd', 'Outside-In TDD'],
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
      '/next-steps',
    ],
  },
};
