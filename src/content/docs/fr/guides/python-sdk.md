---
title: Utiliser Pokébase avec Python
description: Installez une bibliothèque Python open source existante pour explorer PokéAPI.
---

Les exemples **Python — Pokébase** utilisent [Pokébase](https://github.com/PokeAPI/pokebase), un wrapper open source existant pour PokéAPI. Il fournit des objets dynamiques et met les réponses en cache localement. Ce n’est pas un client typé généré depuis la spécification OpenAPI de ce site.

## Installer

Les exemples sont testés avec Python 3.12 et Pokébase 1.4.1. Créez un environnement virtuel dans le dossier de votre choix :

```sh
python3 -m venv .venv-examples
. .venv-examples/bin/activate
python -m pip install pokebase==1.4.1
```

Vous n’avez besoin ni du dépôt de cette documentation, ni de Docker, ni d’un générateur de client. L’installation télécharge le paquet publié et ses dépendances depuis PyPI. Gardez l’environnement virtuel activé pour exécuter les exemples.

## Récupérer un Pokémon

Enregistrez ce code dans `pokebase-example.py`, puis lancez `python pokebase-example.py` :

```python
import pokebase as pb
from pokebase import common

common.BASE_URL = "https://pokeapi.co/api/v2"
pokemon = pb.pokemon("pikachu")
print(pokemon.id, pokemon.name)
```

Résultat attendu :

```text
25 pikachu
```

Pokébase 1.4.1 utilise une URL HTTP par défaut ; l’exemple sélectionne explicitement HTTPS. Aucune clé API n’est nécessaire. Les attributs comme `pokemon.name` proviennent dynamiquement de la réponse, sans modèle généré ni typage statique des champs.

L’équivalent générique, utilisé sur les pages d’opérations compatibles, est :

```python
resource = pb.APIResource("pokemon", 1)
print(resource.id)
```

Placez ce code après les imports et la configuration HTTPS ci-dessus. Les noms des ressources et des attributs API restent en anglais dans la documentation française.

## Cache et ressources liées

Pokébase met les réponses en cache sur disque et peut charger les ressources liées à la demande. Une requête répétée peut réutiliser le cache ; parcourir les objets liés peut déclencher des requêtes supplémentaires. Un appel au wrapper ne correspond donc pas nécessairement à une seule requête HTTP.

Les exemples ont été vérifiés avec Pikachu, Bulbizarre et un talent. Les talents historiques nuls sont conservés comme `None` en Python. Un appel répété a aussi été vérifié avec les requêtes HTTP bloquées pour contrôler le cache. Ces vérifications ne valident pas toutes les ressources de l’API publique.

## Pagination et couverture

Le choix **Python — Pokébase** est proposé sur les 48 opérations de détail compatibles, comme [Get Pokémon](/api/operations/pokemon_retrieve/) (en anglais). Il est omis sur les autres opérations pour éviter de présenter un appel non pris en charge ou différent.

Pour les listes, utilisez **Python HTTP**. `APIResourceList` de Pokébase récupère toute la liste de ressources et n’expose pas la même interface `limit` et `offset` que les exemples de la référence. Le catalogue d’endpoints du paquet est également antérieur à certaines ressources de notre spécification actuelle.

## Erreurs et limites de version

Une ressource introuvable ou une requête HTTP échouée peut déclencher une exception. L’interface présentée ne propose pas de paramètre de délai maximal par appel. Les réponses en cache peuvent être plus anciennes que les données actuelles.

La version est fixée pour rendre les exemples reproductibles ; la 1.4.1 a été publiée en décembre 2023. Ce site ne maintient pas Pokébase et ne le modifie pas. Utilisez les exemples HTTP directs lorsqu’il faut reproduire exactement l’endpoint et les paramètres de pagination documentés.

Respectez la [politique d’utilisation de PokéAPI](https://pokeapi.co/docs/v2#fairuse) (en anglais), notamment la mise en cache des réponses dans vos applications.
