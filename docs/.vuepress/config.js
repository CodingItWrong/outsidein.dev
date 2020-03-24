module.exports = {
  title: 'Outside-In Frontend Development',
  themeConfig: {
    sidebar: [
      '/about-this-guide',
      {
        title: 'Concepts',
        children: [
          '/why-agile',
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
