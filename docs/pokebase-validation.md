# Pokébase example validation

Checked on 2026-10-25 with Python 3.12 and the published `pokebase==1.4.1` package, installed in a fresh virtual environment inside a temporary Docker container.

- The supported endpoint catalogue matches the pinned package's `common.ENDPOINTS` exactly.
- All 48 detail snippets compile and execute with mocked resource data through the real `APIResource` interface; expected resource endpoints and ID `1` are verified.
- All 102 operations retain a Python HTTP example. Pokébase snippets are deliberately omitted for paginated lists and unsupported paths.
- The exact displayed Pokémon and ability snippets execute successfully against the public API (Bulbasaur and Stench).
- The exact standalone guide example is identical in English and French and prints `25 pikachu` after a real request.
- Bulbasaur's nullable historical abilities remain `None`.
- A repeated resource lookup succeeds with all HTTP calls blocked, confirming cache reuse.

These checks validate representative live responses, not every resource. Pokébase lists fetch all resources, so they are not substituted for paginated HTTP examples. Examples select HTTPS explicitly. There is no locally generated client, custom response model, or SDK-specific OpenAPI patch to maintain.
