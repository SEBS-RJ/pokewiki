import React from "react";
import { FiX } from "react-icons/fi";
import { getTypeColor } from "../../utils/typeColors";
import {
  formatPokemonId,
  formatPokemonName,
  getPokemonImageUrl,
  getStatColor,
  calculateStatPercentage,
} from "../../utils/pokemonHelpers";
import { useTypeEffectiveness } from "../../hooks/useTypeEffectiveness";

const PokemonDetailModal = ({ pokemon, onClose, onCapture, isCaptured }) => {
  const types = pokemon.types.map((t) => t.type.name);
  const { matchups } = useTypeEffectiveness(types);

  if (!pokemon) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
            {formatPokemonName(pokemon.name)} #{formatPokemonId(pokemon.id)}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* IMAGEN Y TIPOS */}
            <div className="flex flex-col items-center">
              <img
                src={getPokemonImageUrl(pokemon.id, "official")}
                alt={pokemon.name}
                className="w-full max-w-sm h-auto object-contain"
              />

              <div className="flex gap-2 mt-4">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="px-4 py-2 text-sm font-semibold text-white rounded-full capitalize"
                    style={{ backgroundColor: getTypeColor(type.type.name) }}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* ESTADÍSTICAS */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
                  Estadísticas Base
                </h3>

                <div className="space-y-3">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                          {stat.stat.name.replace("-", " ")}
                        </span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {stat.base_stat}
                        </span>
                      </div>

                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${calculateStatPercentage(
                              stat.base_stat
                            )}%`,
                            backgroundColor: getStatColor(stat.stat.name),
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ATRIBUTOS FÍSICOS */}
              <div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
                  Atributos Físicos
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Altura
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {(pokemon.height / 10).toFixed(1)} m
                    </p>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Peso
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {(pokemon.weight / 10).toFixed(1)} kg
                    </p>
                  </div>
                </div>
              </div>

              {/* HABILIDADES */}
              <div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
                  Habilidades
                </h3>

                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability.ability.name}
                      className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                        ability.is_hidden
                          ? "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {ability.ability.name.replace("-", " ")}
                      {ability.is_hidden && " (Oculta)"}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DEBILIDADES / RESISTENCIAS / INMUNIDADES */}
          {matchups && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {matchups.weaknesses.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold mb-3 text-red-600 dark:text-red-400">
                    Débil a
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {matchups.weaknesses.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 rounded-full text-sm font-semibold text-white capitalize"
                        style={{ backgroundColor: getTypeColor(type) }}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {matchups.resistances.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold mb-3 text-green-600 dark:text-green-400">
                    Resistente a
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {matchups.resistances.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 rounded-full text-sm font-semibold text-white capitalize"
                        style={{ backgroundColor: getTypeColor(type) }}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {matchups.immunities.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold mb-3 text-blue-600 dark:text-blue-400">
                    Inmune a
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {matchups.immunities.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 rounded-full text-sm font-semibold text-white capitalize"
                        style={{ backgroundColor: getTypeColor(type) }}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* BOTÓN CAPTURAR */}
          {onCapture && (
            <button
              onClick={() => onCapture(pokemon)}
              disabled={isCaptured}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                isCaptured
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isCaptured ? "Ya Capturado" : "Capturar Pokémon"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailModal;
