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

## Sources

- [PokéAPI](https://pokeapi.co/api/v2/)
- [Official OpenAPI specification](https://raw.githubusercontent.com/PokeAPI/pokeapi/master/openapi.yml)

## Status

Planning stage. Implementation will progress through small, focused commits to make each step easy to review and understand. This POC will later be compared with pokedocs-scalar.
