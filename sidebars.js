/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  bookSidebar: [
    {
      type: 'doc',
      id: 'about-this-book',
    },
    {
      type: 'category',
      label: 'Concepts',
      link: {type: 'doc', id: 'concepts/why-agile'},
      items: [
        'concepts/why-agile',
        'concepts/testing-concepts',
        'concepts/why-tdd',
        'concepts/outside-in-tdd',
      ],
    },
    {
      type: 'category',
      label: 'Exercise',
      link: {type: 'doc', id: 'exercise-intro'},
      items: [
        'exercise-intro',
        {
          type: 'category',
          label: 'React',
          link: {type: 'doc', id: 'react/index'},
          items: [
            'react/index',
            'react/project-setup',
            'react/vertical-slice',
            'react/refactoring-styles',
            'react/edge-cases',
            'react/writing-data',
          ],
        },
        {
          type: 'category',
          label: 'Vue',
          link: {type: 'doc', id: 'vue/index'},
          items: [
            'vue/index',
            'vue/project-setup',
            'vue/vertical-slice',
            'vue/refactoring-styles',
            'vue/edge-cases',
            'vue/writing-data',
          ],
        },
        'exercise-wrap-up',
      ],
    },
    {
      type: 'doc',
      id: 'next-steps',
    },
  ],
};

module.exports = sidebars;
