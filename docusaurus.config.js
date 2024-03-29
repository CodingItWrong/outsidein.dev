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
            label: 'Buy Ebook or Paperback',
            href: '/book',
            position: 'left',
          },
          {
            label: 'Connect',
            href: '/connect',
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
                label: 'Buy Ebook or Paperback',
                href: '/book',
              },
              {
                label: 'Read Online',
                to: '/about-this-book',
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
              {
                label: 'Mastodon',
                href: 'https://tdd.social/@codingitwrong',
                rel: 'me',
              },
            ],
          },
        ],
        copyright: `Copyright © 2020-${new Date().getFullYear()} Josh Justice.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
