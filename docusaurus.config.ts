import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import type * as Plugin from '@docusaurus/types/src/plugin';
import type * as OpenApiPlugin from 'docusaurus-plugin-openapi-docs';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'Pocket ID',
  tagline:
    'Pocket ID is a simple OIDC provider that allows users to authenticate with their passkeys to your services.',
  favicon: 'img/logo.png',

  url: 'https://pocket-id.org',
  baseUrl: '/',
  organizationName: 'pocket-id',
  projectName: 'website',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  future: {
    v4: true,
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/docs',
          sidebarPath: './sidebars.ts',
          docItemComponent: '@theme/ApiItem',
          editUrl: 'https://github.com/pocket-id/website/edit/main',
        },
        theme: {
          customCss: 'static/styles.css',
        },
        blog: false,
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/logo.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Pocket ID',
      logo: {
        alt: 'Pocket ID Logo',
        src: 'img/logo.png',
      },
      items: [
        // Version gets replaced by the version-label.ts script
        {
          to: '#version',
          label: ' ',
          position: 'right',
        },
        {
          href: 'https://github.com/pocket-id/pocket-id',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'openapi',
        docsPluginId: 'classic',
        config: {
          pocketid: {
            specPath: 'static/swagger.yaml',
            outputDir: 'docs/api/endpoints',
            hideSendButton: true,
            sidebarOptions: {
              groupPathsBy: 'tag',
              categoryLinkSource: 'tag',
            },
          } satisfies OpenApiPlugin.Options,
        } satisfies Plugin.PluginOptions,
      },
    ],
    [
      'docusaurus-plugin-generate-llms-txt',
      {
        outputFile: 'llms.txt',
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/docs/advanced/distroless-container-security-hardening',
            from: ['/docs/advanced/container-security-hardening'],
          },
        ],
      },
    ],
  ],

  clientModules: [require.resolve('./src/version-label.ts'), require.resolve('./src/theme/Root.tsx')],
  themes: ['docusaurus-theme-openapi-docs'],
};
export default config;
