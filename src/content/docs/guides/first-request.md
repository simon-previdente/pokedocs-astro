---
title: Make your first request
description: Retrieve Pikachu from PokéAPI using cURL, Python, or PHP.
---

Retrieve a Pokémon with a single HTTP GET request. PokéAPI is public: you do not need an account or an API key.

## Choose a resource

The API base URL is `https://pokeapi.co/api/v2/`. To retrieve Pikachu, request `pokemon/pikachu/`:

```text
GET https://pokeapi.co/api/v2/pokemon/pikachu/
```

You can also use its numeric ID: `pokemon/25/`. Keep resource names such as `pikachu` in English, even when reading the French documentation.

## Send the request

Choose one of the following examples. Each sends the same request; running all three is optional.

### cURL

Requires cURL. Run this command in your terminal to print the JSON response:

```sh
curl --fail --show-error --silent --max-time 15 \
  'https://pokeapi.co/api/v2/pokemon/pikachu/'
```

### Python

Requires Python 3. Save this as `first_request.py` and run `python3 first_request.py`. It uses only the standard library.

```python
import json
from urllib.request import Request, urlopen

url = "https://pokeapi.co/api/v2/pokemon/pikachu/"
request = Request(url, headers={"User-Agent": "pokedocs-astro/0.0 (documentation example)"})
with urlopen(request, timeout=15) as response:
    pokemon = json.load(response)

print(json.dumps(pokemon, indent=2))
```

### PHP

Requires PHP 8 or later with the cURL extension. Save this as `first-request.php` and run `php first-request.php`.

```php
<?php

$request = curl_init('https://pokeapi.co/api/v2/pokemon/pikachu/');
curl_setopt_array($request, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FAILONERROR => true,
    CURLOPT_TIMEOUT => 15,
]);

$response = curl_exec($request);
if ($response === false) {
    $error = curl_error($request);
    curl_close($request);
    throw new RuntimeException($error);
}
curl_close($request);

$pokemon = json_decode($response, true, 512, JSON_THROW_ON_ERROR);
echo json_encode($pokemon, JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR), PHP_EOL;
```

## Read the response

A successful request returns HTTP `200` and a JSON object. Here is an excerpt, with the other fields omitted:

```json
{
  "id": 25,
  "name": "pikachu",
  "height": 4,
  "weight": 60
}
```

- `id` is the Pokémon identifier.
- `name` is the API resource name.
- `height` is measured in decimetres: `4` means 0.4 m.
- `weight` is measured in hectograms: `60` means 6 kg.

The complete response also includes abilities, types, moves, and sprites.

## If the request fails

- **HTTP 404:** check the resource name or numeric ID.
- **HTTP 403:** the service may reject some clients; the Python example sends an explicit `User-Agent` header.
- **Connection error or timeout:** check your internet connection and try again later.
- **PHP reports an undefined `curl_init`:** enable the PHP cURL extension.

Cache responses when building an application and avoid repeatedly requesting unchanged resources, as requested by the [PokéAPI fair use policy](https://pokeapi.co/docs/v2#fairuse).

See the [official PokéAPI documentation](https://pokeapi.co/docs/v2#pokemon) for the full Pokémon response model.

## Explore the reference

See the generated [Get Pokémon operation](/api/operations/pokemon_retrieve/) for parameters and the response schema.
