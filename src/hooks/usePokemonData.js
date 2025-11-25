import { useState, useEffect } from "react";
import { pokeAPI } from "../services/pokeapi";

export const usePokemonData = (pageSize = 50) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [allPokemonIndex, setAllPokemonIndex] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const loadAllNames = async () => {
      try {
        const data = await pokeAPI.getPokemonList(100000, 0);
        const index = data.results.map((p, idx) => ({
          name: p.name,
          id: idx + 1,
        }));
        setAllPokemonIndex(index);
      } catch (err) {
        setError(err.message);
      }
    };
    loadAllNames();
  }, []);

  const loadPokemon = async () => {
    if (!hasMore) return;
    try {
      setLoading(true);
      const data = await pokeAPI.getPokemonList(pageSize, offset);
      const detailed = await Promise.all(
        data.results.map((p) => pokeAPI.getPokemonByName(p.name))
      );
      setPokemonList((prev) => [...prev, ...detailed]);
      setOffset((prev) => prev + pageSize);
      setHasMore(!!data.next);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    pokemonList,
    allPokemonIndex,
    loading,
    error,
    hasMore,
    loadMore: loadPokemon,
  };
};
