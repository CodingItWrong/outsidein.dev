// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const lightCodeTheme = require('prism-react-renderer/themes/github');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Outside-In Frontend Development',
  tagline: 'Build frontend apps that last.',
  url: 'https://outsidein.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'codingitwrong', // Usually your GitHub org/user name.
  projectName: 'outsidein.dev', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        gtag: {
          trackingID: 'G-B67RNW0ZGG',
          anonymizeIP: true,
        },
        docs: {
          path: 'book',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Outside-In Frontend Development',
        logo: {
          alt: 'My Site Logo',
          src: 'logo-36@3x.gif',
        },
        items: [
          {
            type: 'doc',
            docId: 'about-this-book',
            position: 'left',
            label: 'Book',
          },
          {
            label: 'Contact',
            href: '/contact',
            position: 'right',
          },
          {
            label: 'Chat',
            href: 'https://gitter.im/outsideindev/community',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Book',
                to: '/about-this-book',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Chat',
                href: 'https://gitter.im/outsideindev/community',
                position: 'right',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Contact',
                to: '/contact',
              },
            ],
          },
        ],
        copyright: `Copyright © 2020-${new Date().getFullYear()} Josh Justice. Down arrow icon by Mega Agustina from the Noun Project.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
