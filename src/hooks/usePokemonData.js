import { useState, useEffect } from "react";
import { pokeAPI } from "../services/pokeapi";

export const usePokemonData = (initialLimit = 50) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadPokemon(initialLimit);
  }, []);

  const loadPokemon = async (limit = 50, offset = 0) => {
    try {
      setLoading(true);
      const data = await pokeAPI.getPokemonList(limit, offset);

      const detailedPokemon = await Promise.all(
        data.results.map(async (p) => pokeAPI.getPokemonByName(p.name))
      );

      if (offset === 0) setPokemonList(detailedPokemon);
      else setPokemonList((prev) => [...prev, ...detailedPokemon]);

      setHasMore(data.next !== null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!loading && hasMore) {
      await loadPokemon(50, pokemonList.length);
    }
  };

  const getPokemonById = async (id) => {
    const cached = pokemonList.find((p) => p.id === parseInt(id));
    if (cached) return cached;
    return await pokeAPI.getPokemonById(id);
  };

  return { pokemonList, loading, error, hasMore, loadMore, getPokemonById, refresh: () => loadPokemon(initialLimit) };
};
