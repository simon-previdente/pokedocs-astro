# pokedocs-astro

A proof of concept for a static, multilingual technical documentation site built with Astro, Starlight, and OpenAPI, using the public PokéAPI as a practical example.

## Goals

- Publish guides written in Markdown and MDX.
- Generate an API reference from the official OpenAPI specification with starlight-openapi.
- Provide documentation in French and English using Starlight's native internationalization.
- Include request examples in cURL, Python, and PHP.
- Keep navigation, search, and design consistent across guides and API reference pages.
- Generate static HTML without an application server.

## Planned stack

Astro, TypeScript, Starlight, starlight-openapi, and npm.

Prefer native features and existing plugins over a custom documentation generator. Use stable, compatible versions when implementing the project.

## Development environment

Install [nvm](https://github.com/nvm-sh/nvm), then run from the project directory:

```sh
nvm install
nvm use
node --version
npm --version
```

The `.nvmrc` file pins Node.js to version 26.12.1, the latest stable release when this environment was set up. It includes npm 11.20.0.

## Local development

After selecting the Node.js version, install the locked dependencies and start the site:

```sh
npm ci
npm run dev
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run check` | Check Astro and TypeScript files. |
| `npm run build` | Generate the static site and search index in `dist/`. |
| `npm run preview` | Preview the production build locally. |

TypeScript 6 is used because the current version of `@astrojs/check` does not support TypeScript 7 yet. Dependency versions are recorded in `package-lock.json`.

## Project structure

- `astro.config.mjs`: static output and Starlight configuration.
- `src/content.config.ts`: documentation collection and schema.
- `src/content/docs/`: documentation pages (currently the welcome page).

## Sources

- [PokéAPI](https://pokeapi.co/api/v2/)
- [Official OpenAPI specification](https://raw.githubusercontent.com/PokeAPI/pokeapi/master/openapi.yml)

## Status

The Astro + Starlight foundation is in place, with a welcome page and static search indexing. Bilingual guides and the generated OpenAPI reference are the next steps. Implementation progresses through small, focused commits to make each step easy to review and understand. This POC will later be compared with pokedocs-scalar.

The build currently reports warnings for the empty translation collection and the missing custom 404 content. Starlight still generates its default 404 page. Sitemap generation is skipped until a deployment URL is configured through Astro's `site` option.
