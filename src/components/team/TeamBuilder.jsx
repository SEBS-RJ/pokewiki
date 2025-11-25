import React, { useState } from "react";
import { usePokemonContext } from "../../context/PokemonContext";
import TeamSlot from "./TeamSlot";
import PokemonCard from "../pokemon/PokemonCard";
import { FiSearch, FiX } from "react-icons/fi";

const TeamBuilder = ({ team, onUpdateTeam }) => {
  const { capturedPokemon } = usePokemonContext();
  const [showSelector, setShowSelector] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const MAX_TEAM_SIZE = 6;

  const handleAddToSlot = (slotIndex) => {
    setSelectedSlot(slotIndex);
    setShowSelector(true);
  };

  const handleSelectPokemon = (pokemon) => {
    if (selectedSlot !== null) {
      const newTeam = [...team];
      newTeam[selectedSlot] = pokemon;
      onUpdateTeam(newTeam);
      setShowSelector(false);
      setSelectedSlot(null);
      setSearchQuery("");
    }
  };

  const handleRemoveFromSlot = (slotIndex) => {
    const newTeam = [...team];
    newTeam[slotIndex] = null;
    onUpdateTeam(newTeam);
  };

  const filteredPokemon = capturedPokemon.filter(
    (p) =>
      !team.some(
        (t) =>
          t &&
          (t.id === p.id ||
            t.pokemon_id === p.pokemon_id ||
            t.id === p.pokemon_id)
      ) &&
      (p.name || p.pokemon_name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const teamSlots = Array(MAX_TEAM_SIZE)
    .fill(null)
    .map((_, i) => team[i] || null);

  return (
    <div className="space-y-6">
      {/* Slots del equipo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamSlots.map((pokemon, index) => (
          <TeamSlot
            key={index}
            pokemon={pokemon}
            slotNumber={index + 1}
            onAdd={() => handleAddToSlot(index)}
            onRemove={() => handleRemoveFromSlot(index)}
          />
        ))}
      </div>

      {/* Modal de selección */}
      {showSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Selecciona un Pokémon para el Slot {selectedSlot + 1}
              </h3>
              <button
                onClick={() => {
                  setShowSelector(false);
                  setSelectedSlot(null);
                  setSearchQuery("");
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Buscador */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Busca entre tus Pokémon capturados..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Lista de selección */}
            <div className="flex-1 overflow-y-auto p-4">
              {filteredPokemon.length === 0 ? (
                <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                  {capturedPokemon.length === 0
                    ? "No tienes Pokémon capturados todavía. ¡Ve a capturar algunos!"
                    : "Ningún Pokémon coincide con tu búsqueda."}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPokemon.map((pokemon) => {
                    const pokemonData = pokemon.pokemon_data || pokemon;
                    return (
                      <div
                        key={pokemon.id || pokemon.pokemon_id}
                        onClick={() => handleSelectPokemon(pokemonData)}
                        className="cursor-pointer"
                      >
                        <PokemonCard pokemon={pokemonData} isCaptured={true} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamBuilder;
