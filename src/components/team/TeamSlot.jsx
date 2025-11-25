import React from "react";
import { FiX, FiPlus } from "react-icons/fi";
import { getTypeColor } from "../../utils/typeColors";
import {
  formatPokemonName,
  getPokemonImageUrl,
} from "../../utils/pokemonHelpers";

const TeamSlot = ({ pokemon, onRemove, onAdd, slotNumber }) => {
  if (!pokemon) {
    return (
      <div
        className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:border-blue-500 transition-colors"
        onClick={onAdd}
      >
        <FiPlus size={48} className="text-gray-400 mb-2" />
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Slot {slotNumber}
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-xs">Agregar Pokémon</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden relative group">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 z-10 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
      >
        <FiX size={16} />
      </button>

      <div
        className="h-32 flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${getTypeColor(
            pokemon.types[0].type.name
          )} 0%, ${getTypeColor(pokemon.types[0].type.name)}88 100%)`,
        }}
      >
        <img
          src={getPokemonImageUrl(pokemon.id, "official")}
          alt={pokemon.name}
          className="w-24 h-24 object-contain drop-shadow-lg"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white capitalize mb-2">
          {formatPokemonName(pokemon.name)}
        </h3>

        <div className="flex gap-1 mb-3">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className="px-2 py-1 text-xs font-semibold text-white rounded-full capitalize"
              style={{ backgroundColor: getTypeColor(type.type.name) }}
            >
              {type.type.name}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">HP</p>
            <p className="font-bold text-gray-900 dark:text-white">
              {pokemon.stats[0].base_stat}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">ATK</p>
            <p className="font-bold text-gray-900 dark:text-white">
              {pokemon.stats[1].base_stat}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">DEF</p>
            <p className="font-bold text-gray-900 dark:text-white">
              {pokemon.stats[2].base_stat}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSlot;
