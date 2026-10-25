import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  output: 'static',
  integrations: [
    starlight({
      title: 'pokédocs',
      description: 'Technical documentation for exploring PokéAPI.',
    }),
  ],
});
