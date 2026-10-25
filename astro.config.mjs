import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  output: 'static',
  integrations: [
    starlight({
      title: 'pokédocs',
      description: 'Technical documentation for exploring PokéAPI.',
      sidebar: [
        { slug: '' },
        {
          label: 'Guides',
          items: [{ slug: 'guides/first-request' }],
        },
      ],
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        fr: { label: 'Français', lang: 'fr' },
      },
    }),
  ],
});
