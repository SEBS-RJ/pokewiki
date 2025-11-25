const STORAGE_KEYS = {
  CAPTURED_POKEMON: "captured_pokemon",
  USER_TEAM: "user_team",
  THEME: "theme_preference",
  FAVORITES: "favorite_pokemon",
};

export const storage = {
  getCapturedPokemon: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CAPTURED_POKEMON);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading captured pokemon:", error);
      return [];
    }
  },

  saveCapturedPokemon: (pokemon) => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.CAPTURED_POKEMON,
        JSON.stringify(pokemon)
      );
      return true;
    } catch (error) {
      console.error("Error saving captured pokemon:", error);
      return false;
    }
  },

  addCapturedPokemon: (pokemon) => {
    try {
      const captured = storage.getCapturedPokemon();
      const exists = captured.find((p) => p.id === pokemon.id);
      if (!exists) {
        captured.push({
          ...pokemon,
          capturedAt: new Date().toISOString(),
        });
        storage.saveCapturedPokemon(captured);
      }
      return true;
    } catch (error) {
      console.error("Error adding captured pokemon:", error);
      return false;
    }
  },

  removeCapturedPokemon: (pokemonId) => {
    try {
      const captured = storage.getCapturedPokemon();
      const filtered = captured.filter((p) => p.id !== pokemonId);
      storage.saveCapturedPokemon(filtered);
      return true;
    } catch (error) {
      console.error("Error removing captured pokemon:", error);
      return false;
    }
  },

  getUserTeam: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_TEAM);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading user team:", error);
      return [];
    }
  },

  saveUserTeam: (team) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_TEAM, JSON.stringify(team));
      return true;
    } catch (error) {
      console.error("Error saving user team:", error);
      return false;
    }
  },

  getTheme: () => {
    try {
      return localStorage.getItem(STORAGE_KEYS.THEME) || "light";
    } catch (error) {
      return "light";
    }
  },

  saveTheme: (theme) => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      return true;
    } catch (error) {
      return false;
    }
  },

  getFavorites: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      return [];
    }
  },

  toggleFavorite: (pokemonId) => {
    try {
      const favorites = storage.getFavorites();
      const index = favorites.indexOf(pokemonId);
      if (index > -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(pokemonId);
      }
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      return true;
    } catch (error) {
      return false;
    }
  },

  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      return false;
    }
  },
};
