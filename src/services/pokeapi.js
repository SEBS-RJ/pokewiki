const BASE_URL = "https://pokeapi.co/api/v2";

export const pokeAPI = {
  getPokemonList: async (limit = 50, offset = 0) => {
    try {
      const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      return data; // data.results contiene {name, url}
    } catch (error) {
      console.error("Error fetching pokemon list:", error);
      throw error;
    }
  },

  getAllPokemonLight: async () => {
    try {
      const response = await fetch(`${BASE_URL}/pokemon?limit=2000`); // máximo todos los Pokémon
      const data = await response.json();
      return data.results; // solo name y url
    } catch (error) {
      console.error("Error fetching all pokemon light:", error);
      throw error;
    }
  },

  getPokemonById: async (id) => {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`);
    const data = await response.json();
    return data;
  },

  getPokemonByName: async (name) => {
    const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
    const data = await response.json();
    return data;
  },

  searchPokemon: async (query) => {
    try {
      return await pokeAPI.getPokemonByName(query);
    } catch (err) {
      return null;
    }
  },
};
