export const formatPokemonId = (id) => {
  return String(id).padStart(3, "0");
};

export const formatPokemonName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const getPokemonImageUrl = (id, variant = "default") => {
  const formattedId = formatPokemonId(id);

  const urls = {
    default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    official: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    home: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`,
    shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`,
  };

  return urls[variant] || urls.default;
};

export const getPokemonSilhouetteUrl = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const calculateStats = (pokemon) => {
  if (!pokemon || !pokemon.stats) return null;

  const stats = {};
  pokemon.stats.forEach((stat) => {
    stats[stat.stat.name] = stat.base_stat;
  });

  const total = Object.values(stats).reduce((sum, val) => sum + val, 0);

  return {
    ...stats,
    total,
  };
};

export const getStatColor = (statName) => {
  const colors = {
    hp: "#FF5959",
    attack: "#F5AC78",
    defense: "#FAE078",
    "special-attack": "#9DB7F5",
    "special-defense": "#A7DB8D",
    speed: "#FA92B2",
  };
  return colors[statName] || "#A8A878";
};

export const calculateStatPercentage = (statValue, maxStat = 255) => {
  return (statValue / maxStat) * 100;
};

export const getPokemonTypes = (pokemon) => {
  if (!pokemon || !pokemon.types) return [];
  return pokemon.types.map((type) => type.type.name);
};

export const getPokemonAbilities = (pokemon) => {
  if (!pokemon || !pokemon.abilities) return [];
  return pokemon.abilities.map((ability) => ({
    name: ability.ability.name,
    isHidden: ability.is_hidden,
  }));
};

export const filterPokemonByType = (pokemonList, type) => {
  if (!type) return pokemonList;
  return pokemonList.filter((pokemon) =>
    getPokemonTypes(pokemon).includes(type.toLowerCase())
  );
};

export const searchPokemon = (pokemonList, query) => {
  if (!query) return pokemonList;
  const lowerQuery = query.toLowerCase();
  return pokemonList.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(lowerQuery) ||
      pokemon.id.toString().includes(lowerQuery)
  );
};

export const sortPokemon = (pokemonList, sortBy) => {
  const sorted = [...pokemonList];

  switch (sortBy) {
    case "id-asc":
      return sorted.sort((a, b) => a.id - b.id);
    case "id-desc":
      return sorted.sort((a, b) => b.id - a.id);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
};

export const getGenerationFromId = (id) => {
  if (id <= 151) return 1;
  if (id <= 251) return 2;
  if (id <= 386) return 3;
  if (id <= 493) return 4;
  if (id <= 649) return 5;
  if (id <= 721) return 6;
  if (id <= 809) return 7;
  if (id <= 905) return 8;
  return 9;
};

export const getEvolutionChainUrl = (speciesUrl) => {
  return speciesUrl.replace("pokemon-species", "evolution-chain");
};

export const calculateCaptureRate = (pokemon) => {
  if (!pokemon) return 0;
  const baseRate = 45;
  return Math.min(100, baseRate + (pokemon.base_experience || 0) / 10);
};
