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
- `src/content/docs/`: English documentation pages, served at `/`.
- `src/content/docs/fr/`: equivalent French pages, served at `/fr/`.

## Languages

English is the default language at `/`; French is available at `/fr/`. Starlight provides the language picker and translated interface labels natively.

Use matching relative filenames for equivalent pages: for example, `src/content/docs/index.md` and `src/content/docs/fr/index.md`. Starlight falls back to English when a French translation is missing, so add both versions for each new page.

## API reference

`starlight-openapi` generates the reference from the unmodified local `schemas/pokeapi.yml` snapshot. See [snapshot provenance](schemas/README.md). No network request is needed to fetch the schema during builds.

- Reference overview: `/api/`.
- Example operation: `/api/operations/pokemon_retrieve/`.
- Generated pages share Starlight navigation, styling, and Pagefind indexing with the guides.
- Operation pages include generated cURL snippets. Python and PHP examples are available in the first-request guide; adding them to generated pages is a separate step.

### Current POC limitations

The official schema and the plugin's reference labels are in English. The plugin does not currently provide native i18n ([upstream issue](https://github.com/HiDeoo/starlight-openapi/issues/37)), so there is no French API reference yet. French guides link explicitly to the English reference. On API pages only, a small language component override links back to French guides instead of offering nonexistent `/fr/api/` URLs. Guides retain Starlight's native language picker.

Generated snippets and response examples come from schema types and may use placeholder values; use the first-request guide for a verified Pikachu request. The official schema also describes some features marked as local-only, such as the `q` query parameter; those are not available on the public API.

### Dependency compatibility

An npm override selects patched `form-data` 4.0.6 or later for `httpsnippet`, the plugin's snippet generator. This avoids a known multipart field injection vulnerability in its pinned dependency. Reassess the override when updating the plugin. After dependency changes, restart the development server if module resolution errors persist.

## Sources

- [PokéAPI](https://pokeapi.co/api/v2/)
- [Official OpenAPI specification](https://raw.githubusercontent.com/PokeAPI/pokeapi/master/openapi.yml)

## Status

The Astro + Starlight foundation is in place, with French and English welcome pages, a native language picker, and static search indexing. A bilingual first-request guide demonstrates cURL, Python, and PHP examples, linked from the homepages and sidebar. The official OpenAPI snapshot now generates the API reference at `/api/`. Implementation progresses through small, focused commits to make each step easy to review and understand. This POC will later be compared with pokedocs-scalar.

The build currently reports warnings for the empty translation collection and the missing custom 404 content. Starlight still generates its default 404 page. Sitemap generation is skipped until a deployment URL is configured through Astro's `site` option.
