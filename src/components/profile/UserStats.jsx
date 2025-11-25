import React from "react";
import { usePokemonContext } from "../../context/PokemonContext";

const UserStats = () => {
  const { capturedPokemon, pokemonList } = usePokemonContext();

  const stats = {
    totalCaptured: capturedPokemon.length,
    totalAvailable: pokemonList.length,
    completionPercentage:
      pokemonList.length > 0
        ? ((capturedPokemon.length / pokemonList.length) * 100).toFixed(1)
        : 0,
  };

  const typeDistribution = capturedPokemon.reduce((acc, pokemon) => {
    const pokemonData = pokemon.pokemon_data || pokemon;
    if (pokemonData.types) {
      pokemonData.types.forEach((type) => {
        const typeName = type.type.name;
        acc[typeName] = (acc[typeName] || 0) + 1;
      });
    }
    return acc;
  }, {});

  const favoriteType =
    Object.keys(typeDistribution).length > 0
      ? Object.entries(typeDistribution).sort((a, b) => b[1] - a[1])[0]
      : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Tus Estadísticas
      </h2>

      <div className="space-y-6">
        {/* PROGRESO POKEDEX */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Progreso de la Pokédex
            </span>
            <span className="text-2xl font-bold text-blue-500">
              {stats.completionPercentage}%
            </span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${stats.completionPercentage}%` }}
            />
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {stats.totalCaptured} / {stats.totalAvailable} Pokémon
          </p>
        </div>

        {/* TARJETAS PEQUEÑAS */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Total Capturados
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">
              {stats.totalCaptured}
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Tipo Favorito
            </p>
            <p className="text-xl font-bold text-purple-600 dark:text-purple-300 capitalize">
              {favoriteType ? favoriteType[0] : "Ninguno"}
            </p>
          </div>
        </div>

        {/* DISTRIBUCIÓN DE TIPOS */}
        {Object.keys(typeDistribution).length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
              Colección por Tipos
            </h3>

            <div className="space-y-2">
              {Object.entries(typeDistribution)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([type, count]) => (
                  <div key={type}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm capitalize text-gray-700 dark:text-gray-300">
                        {type}
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {count}
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${(count / stats.totalCaptured) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStats;
