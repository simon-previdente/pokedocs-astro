# Install: python -m pip install pokebase==1.4.1
# Setup and limitations: /guides/python-sdk/
import pokebase as pb
from pokebase import common

common.BASE_URL = "https://pokeapi.co/api/v2"
resource = pb.APIResource("__POKEBASE_ENDPOINT__", 1)
print(resource.id)
