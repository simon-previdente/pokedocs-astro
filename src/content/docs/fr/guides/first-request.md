---
title: Effectuer votre première requête
description: Récupérez Pikachu depuis PokéAPI avec cURL, Python ou PHP.
---

Récupérez un Pokémon avec une simple requête HTTP GET. PokéAPI est publique : aucun compte ni aucune clé API ne sont nécessaires.

## Choisir une ressource

L’URL de base de l’API est `https://pokeapi.co/api/v2/`. Pour récupérer Pikachu, demandez `pokemon/pikachu/` :

```text
GET https://pokeapi.co/api/v2/pokemon/pikachu/
```

Vous pouvez aussi utiliser son identifiant numérique : `pokemon/25/`. Conservez les noms des ressources comme `pikachu` en anglais, même en consultant la documentation française.

## Envoyer la requête

Choisissez l’un des exemples suivants. Ils envoient la même requête ; il n’est pas nécessaire de tous les exécuter.

### cURL

Nécessite cURL. Exécutez cette commande dans votre terminal pour afficher la réponse JSON :

```sh
curl --fail --show-error --silent --max-time 15 \
  'https://pokeapi.co/api/v2/pokemon/pikachu/'
```

### Python

Nécessite Python 3. Enregistrez ce code dans `first_request.py`, puis lancez `python3 first_request.py`. Il utilise uniquement la bibliothèque standard.

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

Nécessite PHP 8 ou une version ultérieure avec l’extension cURL. Enregistrez ce code dans `first-request.php`, puis lancez `php first-request.php`.

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

## Lire la réponse

Une requête réussie renvoie le statut HTTP `200` et un objet JSON. Voici un extrait, les autres champs étant omis :

```json
{
  "id": 25,
  "name": "pikachu",
  "height": 4,
  "weight": 60
}
```

- `id` est l’identifiant du Pokémon.
- `name` est le nom de la ressource dans l’API.
- `height` est mesuré en décimètres : `4` signifie 0,4 m.
- `weight` est mesuré en hectogrammes : `60` signifie 6 kg.

La réponse complète contient aussi les talents, les types, les capacités et les images.

## En cas d’échec

- **HTTP 404 :** vérifiez le nom de la ressource ou son identifiant numérique.
- **HTTP 403 :** le service peut refuser certains clients ; l’exemple Python envoie un en-tête `User-Agent` explicite.
- **Erreur de connexion ou délai dépassé :** vérifiez votre connexion Internet et réessayez plus tard.
- **PHP indique que `curl_init` est introuvable :** activez l’extension cURL de PHP.

Mettez les réponses en cache dans vos applications et évitez de demander plusieurs fois des ressources inchangées, conformément à la [politique d’utilisation de PokéAPI](https://pokeapi.co/docs/v2#fairuse) (en anglais).

Consultez la [documentation officielle de PokéAPI](https://pokeapi.co/docs/v2#pokemon) (en anglais) pour le modèle complet de la réponse Pokémon.

## Explorer la référence

Consultez l’opération [Get Pokémon](../../../api/operations/pokemon_retrieve/) (en anglais) pour les paramètres et le schéma de réponse générés.
