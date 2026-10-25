# Unified search validation

Checked on 2026-10-25 against the production build, served with `npm run preview -- --host 127.0.0.1 --port 4322`. Search uses Starlight's native Pagefind integration; no external search service or custom search renderer is involved.

## Observed results

| Locale | Query | Result |
| --- | --- | --- |
| English | `Python` | 51 pages after adopting Pokébase: 3 authored pages and 48 generated detail-operation pages, in the same search UI. Other API pages remain indexed but do not necessarily contain this term. |
| English | `pokemon` | 77 pages; the Get Pokémon operation appears first. |
| French | `Python` | 3 French pages: the homepage and both guides. No English results. |
| Both | `zzzintrouvable987654` | Localized no-results message. |

Counts describe the current content snapshot and will change as documentation grows.

## Interaction checks

- Opened the Python library guide from an English search result and verified its heading.
- Opened the API metadata operation from a search result and verified its heading.
- Loaded additional results successfully.
- Opened search with Command+K on macOS and closed it with Escape.
- Cleared the query with the native button.
- Switched between English and French guide pages and verified language-specific search results.
- Corrected remaining English Pagefind messages on French pages through Starlight's native `i18n` collection; verified the French search label, clear button, result count, and no-results message.

## Current limitation

Pagefind searches the current page's language. The API reference is only generated in English, so it is searchable from English pages but does not appear in French search results. French users can follow the explicitly labeled English API links in navigation and search the reference there. This POC therefore validates unified guide/API search in English, but not a complete French guide/API search experience.

## Repeat manually

1. Run `npm run build` and `npm run preview -- --host 127.0.0.1 --port 4322`.
2. Open `/`, search for `Python`, and verify both guide and API links.
3. Open a guide result, switch to French, and repeat the query; results should stay under `/fr/`.
4. Test a nonexistent term, clear the query, load more English results, and open an API result.

`npm run dev` does not provide the production search index. Use the production preview when assessing search behavior.
