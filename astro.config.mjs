import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi';

export default defineConfig({
  output: 'static',
  integrations: [
    starlight({
      title: 'pokédocs',
      description: 'Technical documentation for exploring PokéAPI.',
      plugins: [
        starlightOpenAPI([
          {
            base: 'api',
            schema: './schemas/pokeapi.yml',
            sidebar: {
              label: 'PokéAPI reference (English)',
              operations: { badges: true },
            },
            snippets: {
              operation: {
                clients: { shell: ['curl'] },
                default: { target: 'shell', client: 'curl' },
              },
            },
          },
        ]),
      ],
      sidebar: [
        { slug: '' },
        {
          label: 'Guides',
          items: [{ slug: 'guides/first-request' }],
        },
        ...openAPISidebarGroups,
      ],
      components: { LanguageSelect: './src/components/LanguageSelect.astro' },
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        fr: { label: 'Français', lang: 'fr' },
      },
    }),
  ],
});
