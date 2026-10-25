import { mkdir, readFile, writeFile } from 'node:fs/promises';

const root = new URL('../../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');
const schema = JSON.parse(await read('.generated/pokeapi.json'));
const operation = schema.paths['/api/v2/pokemon/'].get;

schema.info = {
  ...schema.info,
  title: 'PokéAPI — essai français',
  description: 'Essai limité à une opération pour évaluer la documentation en français.',
};
operation.summary = 'Lister les Pokémon';
operation.description = 'Récupérez une page de Pokémon. Utilisez limit pour choisir la taille de la page et offset pour sauter des ressources.';
const descriptions = {
  limit: 'Nombre de résultats par page.',
  offset: 'Indice du premier résultat à renvoyer.',
  q: 'Filtre disponible uniquement sur une instance locale, pas sur pokeapi.co.',
};
for (const parameter of operation.parameters ?? []) {
  if (descriptions[parameter.name]) parameter.description = descriptions[parameter.name];
}
operation.responses['200'].description = 'Une page de Pokémon.';
schema.paths = { '/api/v2/pokemon/': { get: operation } };
schema.tags = [{ name: 'pokemon', description: 'Ressources Pokémon.' }];

// Reuse the real site configuration, with an isolated output and the native language picker.
let config = await read('astro.config.mjs');
const override = "      components: { LanguageSelect: './src/components/LanguageSelect.astro' },\n";
if (!config.includes(override) || !config.includes('        starlightOpenAPI([')) {
  throw new Error('The site configuration changed; reassess this bounded experiment.');
}
config = config.replace(override, '');
config = config.replace("  output: 'static',", "  output: 'static',\n  outDir: './.generated/i18n-eval-dist',");
config = config.replace('        starlightOpenAPI([', `        starlightOpenAPI([
          {
            base: 'fr/api',
            schema: './.generated/pokeapi-fr-eval.json',
            sidebar: { label: 'Référence API — essai français', operations: { badges: true } },
            snippets: { operation: false },
          },`);
await mkdir(new URL('.generated/', root), { recursive: true });
await writeFile(new URL('.generated/pokeapi-fr-eval.json', root), JSON.stringify(schema, null, 2) + '\n');
await writeFile(new URL('.generated/astro.i18n-eval.config.mjs', root), config);
console.log('Prepared one translated operation and an isolated configuration with the native language picker.');
