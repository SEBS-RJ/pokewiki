import React, { createContext, useContext, useState, useEffect } from "react";
import { usePokemonData } from "../hooks/usePokemonData";
import { usePokemonSearch } from "../hooks/usePokemonSearch";
import { useCapturedPokemon } from "../hooks/useCapturedPokemon";
import { pokeAPI } from "../services/pokeapi";

const PokemonContext = createContext(null);

export const PokemonProvider = ({ children }) => {
  const pokemonData = usePokemonData(); // carga paginada
  const searchData = usePokemonSearch(pokemonData.allPokemonIndex); // búsqueda ligera
  const capturedData = useCapturedPokemon();

  const [searchResultsFull, setSearchResultsFull] = React.useState([]);

  // Cuando cambian los resultados de búsqueda
  React.useEffect(() => {
    const loadFullResults = async () => {
      if (!searchData.results || searchData.results.length === 0) {
        setSearchResultsFull([]);
        return;
      }

      // Mapea resultados a Pokémon cargados o hace fetch si no están
      const detailedResults = await Promise.all(
        searchData.results.map(async (r) => {
          const found = pokemonData.pokemonList.find((p) => p.id === r.id);
          if (found) return found;
          try {
            const data = await pokeAPI.getPokemonByName(r.name);
            return data;
          } catch {
            return r; // fallback: solo nombre e id
          }
        })
      );

      setSearchResultsFull(detailedResults);
    };

    loadFullResults();
  }, [searchData.results, pokemonData.pokemonList]);

  const value = {
    ...pokemonData,
    searchResults: searchResultsFull,
    setSearchQuery: searchData.setQuery,
    ...capturedData,
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) throw new Error("usePokemonContext debe usarse dentro de PokemonProvider");
  return context;
};
