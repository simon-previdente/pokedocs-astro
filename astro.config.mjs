import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi';

export default defineConfig({
  output: 'static',
  integrations: [
    mermaid({ autoTheme: true, enableLog: false }),
    starlight({
      title: 'pokédocs',
      description: 'Technical documentation for exploring PokéAPI.',
      plugins: [
        starlightOpenAPI([
          {
            base: 'api',
            schema: './.generated/pokeapi.json',
            sidebar: {
              label: 'PokéAPI reference (English)',
              operations: { badges: true },
            },
            snippets: { operation: false },
          },
        ]),
      ],
      sidebar: [
        { slug: '' },
        {
          label: 'Guides',
          items: [
            { slug: 'guides/first-request' },
            { slug: 'guides/pagination' },
            { slug: 'guides/python-sdk' },
          ],
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
