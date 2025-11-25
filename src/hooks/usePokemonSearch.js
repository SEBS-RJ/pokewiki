import { useState, useEffect } from "react";
import { pokeAPI } from "../services/pokeapi";

export const usePokemonSearch = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const data = await pokeAPI.getAllPokemonLight();
        setAllPokemon(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const searchPokemonGlobal = async (query) => {
    if (!query) return null;

    const found = allPokemon.find(
      (p) =>
        p.name.toLowerCase() === query.toLowerCase() ||
        p.url.endsWith(`/${query}/`)
    );

    if (found) {
      return await pokeAPI.getPokemonByName(found.name);
    }
    return null;
  };

  return { allPokemon, loading, searchPokemonGlobal };
};
