# French API reference: bounded experiment

Evaluated on 2026-10-25 with `starlight-openapi` 0.27.0, Astro 7.4.2, and Starlight 0.42.7. This is an opt-in experiment, not part of the normal site configuration or production build.

## Purpose

Check whether one translated OpenAPI operation can use Starlight's French routing, language picker, and search without writing a custom reference renderer.

`prepare.mjs` reads the enriched English schema and creates a separate French document containing only `pokemon_list`. It translates the title, operation summary/description, parameter descriptions, response description, and tag description. It reuses the original response schemas and request examples; it is not a full translation of every schema description or code comment.

The generated experimental config adds a second schema with `base: 'fr/api'`, retains the English reference, and uses the native Starlight language picker instead of the production override. Build output goes to `.generated/i18n-eval-dist/`, leaving `dist/` untouched. The original OpenAPI snapshot is never modified.

## Reproduce

From the repository root:

```sh
nvm use
npm run prepare:schema
node experiments/openapi-i18n/prepare.mjs
npm run build -- --config .generated/astro.i18n-eval.config.mjs
python3 -m http.server 4323 --bind 127.0.0.1 --directory .generated/i18n-eval-dist
```

Open `http://127.0.0.1:4323/fr/api/operations/pokemon_list/`. A separate static file server allows the main Astro production preview to remain on port 4322. Stop the experimental server with Ctrl+C when finished.

## Observations

| Area | Result |
| --- | --- |
| Static build | 123 HTML pages generated successfully, including the experimental French overview, tag overview, and operation. |
| Route and language | `/fr/api/operations/pokemon_list/` exists and declares `lang="fr"`. |
| Operation content | French `Lister les Pokémon` heading and translated prose render correctly. |
| Starlight interface | French search, theme picker, and table-of-contents labels render normally. |
| Native language picker | Switching between the English and French `pokemon_list` pages works both ways. |
| Plugin interface | `Overview`, `Authorizations`, `Parameters`, `Query Parameters`, `Responses`, and snippet-picker labels remain English. These are authored in the plugin, not the OpenAPI operation. |
| Sidebar | Both schema groups appear in both languages. Schema selection does not follow the current locale automatically. |
| Missing translations | The other 101 English operations have no generated French counterpart. The native picker can propose those nonexistent routes; Starlight's authored-content fallback does not generate them. |
| Search | Searching `Lister` on the French operation returns the operation plus two French guides (3 results). No English page appears in these results. |

The production language-picker override is intentionally unchanged: the primary site still has an English-only reference and avoids nonexistent French API URLs.

## Assessment

Localized API routes and language-specific unified search are feasible with the existing plugin. Simply using a second schema is **not** sufficient for a fully French reference.

A maintained bilingual implementation would additionally need:

1. Translation overlays for operation prose and relevant schema descriptions, while preserving operation IDs and JSON keys.
2. Locale-aware sidebar grouping and pagination, including a policy for untranslated operations.
3. Translation support for the plugin's hard-coded interface labels, preferably contributed upstream or provided by a maintained plugin version.

The third point goes beyond configuration of OpenAPI documents and Starlight translation files. Replacing English labels in rendered HTML would be fragile, so this experiment does not introduce such a workaround or a custom reference renderer.

Recommendation for this POC: record the reference's complete French localization as **not satisfied natively**. Keep the isolated experiment as evidence, retain the working English reference in the main site, and use this limitation in the later comparison with `pokedocs-scalar`.

Upstream tracking: https://github.com/HiDeoo/starlight-openapi/issues/37
