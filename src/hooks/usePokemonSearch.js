import { useState, useEffect } from "react";

export function usePokemonSearch(searchTerm) {
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    if (!searchTerm || searchTerm.trim().length === 0) {
      setSearchResults([]);
      setSearchError(null);
      setSearching(false);
      return;
    }

    const searchPokemon = async () => {
      setSearching(true);
      setSearchError(null);

      try {
        const term = searchTerm.toLowerCase().trim();

        // Si es un número, buscar por ID exacto
        if (/^\d+$/.test(term)) {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${term}`
          );

          if (!response.ok) {
            throw new Error("Pokémon no encontrado");
          }

          const data = await response.json();
          const formatted = formatPokemonData(data);
          setSearchResults([formatted]);
        } else {
          // Si es texto, buscar en la lista completa de nombres
          const listResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=1000`
          );
          const listData = await listResponse.json();

          // Filtrar nombres que contengan el término de búsqueda
          const matchingNames = listData.results
            .filter((p) => p.name.includes(term))
            .slice(0, 20); // Limitar a 20 resultados

          if (matchingNames.length === 0) {
            throw new Error("No se encontraron Pokémon con ese nombre");
          }

          // Obtener detalles de cada Pokémon encontrado
          const pokemonDetails = await Promise.all(
            matchingNames.map(async (pokemon) => {
              const res = await fetch(pokemon.url);
              const data = await res.json();
              return formatPokemonData(data);
            })
          );

          setSearchResults(pokemonDetails);
        }
      } catch (err) {
        setSearchError(err.message);
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    };

    // Debounce: esperar 300ms para búsqueda por nombre, instantáneo para ID
    const isNumeric = /^\d+$/.test(searchTerm.trim());
    const delay = isNumeric ? 0 : 300;
    const timeoutId = setTimeout(searchPokemon, delay);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return { searchResults, searching, searchError };
}

// Función helper para formatear datos del Pokémon
function formatPokemonData(data) {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    types: data.types.map((t) => t.type.name),
    stats: data.stats.reduce((acc, stat) => {
      acc[stat.stat.name] = stat.base_stat;
      return acc;
    }, {}),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map((a) => ({
      name: a.ability.name,
      isHidden: a.is_hidden,
    })),
  };
}
