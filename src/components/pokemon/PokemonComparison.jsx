import React from "react";
import { getTypeColor } from "../../utils/typeColors";
import {
  formatPokemonName,
  getPokemonImageUrl,
  getStatColor,
} from "../../utils/pokemonHelpers";
import { useTypeEffectiveness } from "../../hooks/useTypeEffectiveness";

const PokemonComparison = ({ pokemon1, pokemon2 }) => {
  const types1 = pokemon1.types.map((t) => t.type.name);
  const types2 = pokemon2.types.map((t) => t.type.name);

  const { compareTypes } = useTypeEffectiveness(types1);
  const comparison = compareTypes(types1, types2);

  const renderStatComparison = (stat1, stat2, statName) => {
    const value1 = stat1.base_stat;
    const value2 = stat2.base_stat;
    const max = Math.max(value1, value2);
    const percentage1 = (value1 / max) * 100;
    const percentage2 = (value2 / max) * 100;

    return (
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
            {statName.replace("-", " ")}
          </span>
          <div className="flex gap-4">
            <span
              className={`text-sm font-bold ${
                value1 > value2 ? "text-green-600" : "text-gray-600"
              } dark:text-gray-300`}
            >
              {value1}
            </span>
            <span
              className={`text-sm font-bold ${
                value2 > value1 ? "text-green-600" : "text-gray-600"
              } dark:text-gray-300`}
            >
              {value2}
            </span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${percentage1}%`,
                backgroundColor: getStatColor(statName),
              }}
            />
          </div>
          <span className="text-gray-400">vs</span>
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${percentage2}%`,
                backgroundColor: getStatColor(statName),
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  if (!pokemon1 || !pokemon2) {
    return (
      <div className="text-center p-8 text-gray-600 dark:text-gray-400">
        Selecciona dos Pokémon para comparar
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Comparación de Pokémon
      </h2>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="text-center">
          <img
            src={getPokemonImageUrl(pokemon1.id, "official")}
            alt={pokemon1.name}
            className="w-48 h-48 mx-auto object-contain"
          />
          <h3 className="text-xl font-bold mt-4 capitalize text-gray-900 dark:text-white">
            {formatPokemonName(pokemon1.name)}
          </h3>
          <div className="flex gap-2 justify-center mt-2">
            {pokemon1.types.map((type) => (
              <span
                key={type.type.name}
                className="px-3 py-1 text-sm font-semibold text-white rounded-full capitalize"
                style={{ backgroundColor: getTypeColor(type.type.name) }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center">
          <img
            src={getPokemonImageUrl(pokemon2.id, "official")}
            alt={pokemon2.name}
            className="w-48 h-48 mx-auto object-contain"
          />
          <h3 className="text-xl font-bold mt-4 capitalize text-gray-900 dark:text-white">
            {formatPokemonName(pokemon2.name)}
          </h3>
          <div className="flex gap-2 justify-center mt-2">
            {pokemon2.types.map((type) => (
              <span
                key={type.type.name}
                className="px-3 py-1 text-sm font-semibold text-white rounded-full capitalize"
                style={{ backgroundColor: getTypeColor(type.type.name) }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
          Comparación de Estadísticas Base
        </h3>
        {pokemon1.stats.map((stat, index) => (
          <div key={stat.stat.name}>
            {renderStatComparison(stat, pokemon2.stats[index], stat.stat.name)}
          </div>
        ))}
      </div>

      {comparison.commonWeaknesses.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-red-600 dark:text-red-400">
            Debilidades Comunes
          </h3>
          <div className="flex flex-wrap gap-2">
            {comparison.commonWeaknesses.map((type) => (
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

      {comparison.commonResistances.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-3 text-green-600 dark:text-green-400">
            Resistencias Comunes
          </h3>
          <div className="flex flex-wrap gap-2">
            {comparison.commonResistances.map((type) => (
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
  );
};

export default PokemonComparison;
