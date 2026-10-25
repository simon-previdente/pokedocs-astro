---
title: Use Pokébase with Python
description: Install an existing open source Python library to explore PokéAPI.
---

The **Python — Pokébase** examples use [Pokébase](https://github.com/PokeAPI/pokebase), an existing open source wrapper for PokéAPI. It provides dynamic resource objects and caches responses locally. It is not a typed client generated from this site's OpenAPI specification.

## Install

The examples are tested with Python 3.12 and Pokébase 1.4.1. Create a virtual environment in a directory of your choice:

```sh
python3 -m venv .venv-examples
. .venv-examples/bin/activate
python -m pip install pokebase==1.4.1
```

You do not need this documentation repository, Docker, or a client generator. Installation downloads the published package and its dependencies from PyPI. Keep the virtual environment activated when running examples.

## Retrieve a Pokémon

Save this as `pokebase-example.py`, then run `python pokebase-example.py`:

```python
import pokebase as pb
from pokebase import common

common.BASE_URL = "https://pokeapi.co/api/v2"
pokemon = pb.pokemon("pikachu")
print(pokemon.id, pokemon.name)
```

Expected output:

```text
25 pikachu
```

Pokébase 1.4.1 defaults to an HTTP base URL; the example explicitly selects HTTPS. No API key is required. Attributes such as `pokemon.name` come from the response dynamically, without a generated model or static field typing.

The generic equivalent, used on supported operation pages, is:

```python
resource = pb.APIResource("pokemon", 1)
print(resource.id)
```

Put this code after the imports and HTTPS configuration above. Resource names and API attribute names remain in English when reading the French documentation.

## Cache and related resources

Pokébase caches responses on disk and can load related resources lazily. Repeating a request can reuse the cache; navigating related objects can trigger additional requests. This means one wrapper call does not necessarily correspond to exactly one HTTP request.

The examples were checked with Pikachu, Bulbasaur, and an ability. Null historical abilities are preserved as Python `None`. A repeated cached request was also verified with HTTP calls blocked. These checks do not validate every resource returned by the public API.

## Pagination and coverage

The **Python — Pokébase** choice is offered on the 48 compatible detail operations, such as [Get Pokémon](/api/operations/pokemon_retrieve/). It is omitted on other operations rather than displaying an unsupported or different request.

For list operations, use **Python HTTP**. Pokébase's `APIResourceList` fetches the entire resource list and does not expose the same `limit` and `offset` interface as the reference examples. The package's endpoint catalogue also predates some resources in our current specification.

## Errors and version limits

Missing resources and failed HTTP requests can raise exceptions. The demonstrated interface has no per-call timeout parameter. Cached responses may be older than the live API.

The version is pinned for reproducibility; 1.4.1 was published in December 2023. This site does not maintain or patch Pokébase. Use the raw HTTP examples when you need a request that precisely matches the documented endpoint and pagination parameters.

Respect the [PokéAPI fair use policy](https://pokeapi.co/docs/v2#fairuse), including caching responses in your applications.
