import { createContext, useContext } from "react";
import { usePokemonData } from "../hooks/usePokemonData";
import { usePokemonSearch } from "../hooks/usePokemonSearch";
import { useCapturedPokemon } from "../hooks/useCapturedPokemon";

const PokemonContext = createContext(null);

export const PokemonProvider = ({ children }) => {
  const pokemonData = usePokemonData(); // tarjetas
  const searchData = usePokemonSearch(); // búsqueda global
  const capturedData = useCapturedPokemon();

  const value = { ...pokemonData, ...searchData, ...capturedData };

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) throw new Error("usePokemonContext debe usarse dentro de PokemonProvider");
  return context;
};
