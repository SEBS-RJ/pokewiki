import React from "react";
import { getTypeColor, getTypeGradient } from "../../utils/typeColors";
import {
  formatPokemonId,
  formatPokemonName,
  getPokemonImageUrl,
} from "../../utils/pokemonHelpers";
import { FiStar } from "react-icons/fi";

const PokemonCard = ({ pokemon, onSelect, isCaptured, onCapture }) => {
  const primaryType = pokemon.types[0]?.type.name;

  return (
    <div
      className="relative group cursor-pointer"
      onClick={() => onSelect && onSelect(pokemon)}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        style={{
          borderTop: `4px solid ${getTypeColor(primaryType)}`,
        }}
      >
        {isCaptured && (
          <div className="absolute top-2 right-2 z-10 bg-yellow-400 text-white p-2 rounded-full shadow-lg">
            <FiStar size={16} />
          </div>
        )}

        <div
          className="relative h-48 flex items-center justify-center p-4"
          style={{
            background: getTypeGradient(primaryType),
          }}
        >
          <img
            src={getPokemonImageUrl(pokemon.id, "official")}
            alt={pokemon.name}
            className="w-full h-full object-contain drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
              #{formatPokemonId(pokemon.id)}
            </span>
            <div className="flex gap-1">
              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className="px-2 py-1 text-xs font-semibold text-white rounded-full"
                  style={{
                    backgroundColor: getTypeColor(type.type.name),
                  }}
                >
                  {type.type.name.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 capitalize">
            {formatPokemonName(pokemon.name)}
          </h3>

          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 text-xs">HP</p>
              <p className="font-bold text-gray-900 dark:text-white">
                {pokemon.stats[0].base_stat}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 text-xs">ATK</p>
              <p className="font-bold text-gray-900 dark:text-white">
                {pokemon.stats[1].base_stat}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 text-xs">DEF</p>
              <p className="font-bold text-gray-900 dark:text-white">
                {pokemon.stats[2].base_stat}
              </p>
            </div>
          </div>

          {onCapture && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCapture(pokemon);
              }}
              className={`w-full mt-4 py-2 px-4 rounded-lg font-semibold transition-colors ${
                isCaptured
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
              disabled={isCaptured}
            >
              {isCaptured ? "Captured" : "Capture"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
