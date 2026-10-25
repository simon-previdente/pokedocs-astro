import json
from urllib.request import Request, urlopen

url = "__REQUEST_URL__"
request = Request(url, headers={"User-Agent": "pokedocs-astro/0.0 (documentation example)"})
with urlopen(request, timeout=15) as response:
    data = json.load(response)

print(json.dumps(data, indent=2))
