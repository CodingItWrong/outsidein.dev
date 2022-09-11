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
  favicon: 'favicon.ico',
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
        blog: false,
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
          alt: 'Outside-In Frontend Development',
          src: 'logo-36@3x.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'about-this-book',
            position: 'left',
            label: 'Read Online',
          },
          {
            label: 'Buy Ebook',
            href: 'https://leanpub.com/outside-in-react-development',
            position: 'left',
          },
          {
            label: 'Connect',
            href: '/connect',
            position: 'right',
          },
          {
            label: 'Chat',
            href: 'https://link.outsidein.dev/chat',
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
                label: 'Read Online',
                to: '/about-this-book',
              },
              {
                label: 'Buy Ebook',
                href: 'https://leanpub.com/outside-in-react-development',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Chat',
                href: 'https://link.outsidein.dev/chat',
                position: 'right',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Connect',
                to: '/connect',
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
