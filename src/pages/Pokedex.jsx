import React, { useState, useEffect } from "react";
import { usePokemonContext } from "../context/PokemonContext";
import PokemonCard from "../components/pokemon/PokemonCard";
import PokemonDetailModal from "../components/pokemon/PokemonDetailModal";
import Loading from "../components/common/Loading";
import { FiSearch, FiFilter } from "react-icons/fi";
import { filterPokemonByType } from "../utils/pokemonHelpers";

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

const Pokedex = () => {
  const {
    pokemonList,
    loading,
    capturePokemon,
    isCaptured,
    hasMore,
    loadMore,
    searchResults,
    setSearchQuery
  } = usePokemonContext();

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const debouncedSearch = useDebounce(searchInput, 300);

  const types = [
    "normal","fire","water","electric","grass","ice","fighting","poison",
    "ground","flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"
  ];

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  const filteredPokemon = filterPokemonByType(
    debouncedSearch ? searchResults : pokemonList,
    selectedType
  );

  const handleCapture = async (pokemon) => {
    const result = await capturePokemon(pokemon);
    if (result.success) alert(result.message);
  };

  return (
    <div className="space-y-6">
      {/* Header y filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Pokédex</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar Pokémon por nombre o ID..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white appearance-none cursor-pointer"
            >
              <option value="">Todos los Tipos</option>
              {types.map((type) => (
                <option key={type} value={type} className="capitalize">{type}</option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400">
          Mostrando {filteredPokemon.length} Pokémon
        </p>
      </div>

      {/* Lista de Pokémon */}
      {loading && pokemonList.length === 0 ? (
        <Loading message="Cargando la Pokédex..." size="large" />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onSelect={setSelectedPokemon}
                isCaptured={isCaptured(pokemon.id)}
                onCapture={handleCapture}
              />
            ))}
          </div>

          {filteredPokemon.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No se encontraron Pokémon que coincidan con tus criterios
              </p>
            </div>
          )}

          {hasMore && !debouncedSearch && !selectedType && (
            <div className="flex justify-center py-8">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg font-semibold transition-colors"
              >
                {loading ? "Cargando..." : "Cargar más"}
              </button>
            </div>
          )}
        </>
      )}

      {selectedPokemon && (
        <PokemonDetailModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
          onCapture={handleCapture}
          isCaptured={isCaptured(selectedPokemon.id)}
        />
      )}
    </div>
  );
};

export default Pokedex;
