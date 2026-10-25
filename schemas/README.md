# PokéAPI OpenAPI snapshot

- Source: https://raw.githubusercontent.com/PokeAPI/pokeapi/master/openapi.yml
- Retrieved: 2026-10-25
- API version: 2.10.0
- OpenAPI version: 3.1.0
- SHA-256: `40d7b32e6bdf27b113108496ed974210a59910fc8f60b13ba560473aef658881`

`pokeapi.yml` is an unmodified snapshot of the official specification. Keeping it in Git makes builds independent of upstream changes and network availability. Generated HTML is not committed.

To update it, download the source again, review the diff, update this metadata, and run `npm run check` and `npm run build` before committing.

The source defines the server as `https://pokeapi.co` and already includes `/api/v2/` in its paths. Keep that combination to avoid duplicating the API prefix in generated examples.

Before development and builds, `scripts/prepare-schema.mjs` reads this snapshot and writes an ignored `.generated/pokeapi.json` with cURL, Python, and PHP `x-codeSamples`. Only the generated copy is enriched; this snapshot and its checksum remain unchanged.
