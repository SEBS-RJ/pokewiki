import React, { useState } from "react";
import { usePokemonContext } from "../context/PokemonContext";
import PokemonComparison from "../components/pokemon/PokemonComparison";
import PokemonCard from "../components/pokemon/PokemonCard";
import { FiX, FiSearch } from "react-icons/fi";
import { searchPokemon } from "../utils/pokemonHelpers";

const Compare = () => {
  const { pokemonList } = usePokemonContext();
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [showSelector, setShowSelector] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectPokemon = (pokemon) => {
    if (showSelector === 1) {
      setPokemon1(pokemon);
    } else if (showSelector === 2) {
      setPokemon2(pokemon);
    }
    setShowSelector(null);
    setSearchQuery("");
  };

  const filteredPokemon = searchPokemon(pokemonList, searchQuery);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Comparar Pokémon
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Selecciona dos Pokémon para comparar sus estadísticas y tipos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <button
            onClick={() => setShowSelector(1)}
            className="w-full mb-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
          >
            {pokemon1 ? "Cambiar Pokémon 1" : "Seleccionar Pokémon 1"}
          </button>
          {pokemon1 ? (
            <div className="relative">
              <button
                onClick={() => setPokemon1(null)}
                className="absolute top-2 right-2 z-10 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                <FiX size={16} />
              </button>
              <PokemonCard pokemon={pokemon1} />
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Ningún Pokémon seleccionado
              </p>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setShowSelector(2)}
            className="w-full mb-4 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors"
          >
            {pokemon2 ? "Cambiar Pokémon 2" : "Seleccionar Pokémon 2"}
          </button>
          {pokemon2 ? (
            <div className="relative">
              <button
                onClick={() => setPokemon2(null)}
                className="absolute top-2 right-2 z-10 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                <FiX size={16} />
              </button>
              <PokemonCard pokemon={pokemon2} />
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Ningún Pokémon seleccionado
              </p>
            </div>
          )}
        </div>
      </div>

      {pokemon1 && pokemon2 && (
        <PokemonComparison pokemon1={pokemon1} pokemon2={pokemon2} />
      )}

      {showSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-6xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Seleccionar Pokémon {showSelector}
              </h3>
              <button
                onClick={() => {
                  setShowSelector(null);
                  setSearchQuery("");
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar Pokémon..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredPokemon.map((pokemon) => (
                  <div
                    key={pokemon.id}
                    onClick={() => handleSelectPokemon(pokemon)}
                    className="cursor-pointer"
                  >
                    <PokemonCard pokemon={pokemon} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compare;
