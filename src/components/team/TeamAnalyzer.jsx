import React, { useMemo } from "react";
import { getTypeColor } from "../../utils/typeColors";
import { useTypeEffectiveness } from "../../hooks/useTypeEffectiveness";

const TeamAnalyzer = ({ team }) => {
  const validTeam = team.filter((p) => p !== null);

  const analysis = useMemo(() => {
    if (validTeam.length === 0) return null;

    const allTypes = new Set();
    const typeCount = {};
    const allWeaknesses = {};
    const allResistances = {};
    const allImmunities = {};

    validTeam.forEach((pokemon) => {
      pokemon.types.forEach((type) => {
        allTypes.add(type.type.name);
        typeCount[type.type.name] = (typeCount[type.type.name] || 0) + 1;
      });

      const types = pokemon.types.map((t) => t.type.name);
      const { matchups } = useTypeEffectiveness(types);

      if (matchups) {
        matchups.weaknesses.forEach((w) => {
          allWeaknesses[w] = (allWeaknesses[w] || 0) + 1;
        });
        matchups.resistances.forEach((r) => {
          allResistances[r] = (allResistances[r] || 0) + 1;
        });
        matchups.immunities.forEach((i) => {
          allImmunities[i] = (allImmunities[i] || 0) + 1;
        });
      }
    });

    const criticalWeaknesses = Object.entries(allWeaknesses)
      .filter(([type, count]) => count >= validTeam.length * 0.5)
      .map(([type]) => type);

    const commonResistances = Object.entries(allResistances)
      .filter(([type, count]) => count >= 2)
      .map(([type]) => type);

    const totalStats = validTeam.reduce((acc, pokemon) => {
      pokemon.stats.forEach((stat, index) => {
        acc[index] = (acc[index] || 0) + stat.base_stat;
      });
      return acc;
    }, {});

    return {
      typeDistribution: typeCount,
      criticalWeaknesses,
      commonResistances,
      immunities: Object.keys(allImmunities),
      averageStats: Object.values(totalStats).map((s) =>
        Math.round(s / validTeam.length)
      ),
      typeCoverage: allTypes.size,
    };
  }, [validTeam]);

  if (!analysis) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Agrega Pokémon a tu equipo para ver el análisis.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Análisis del Equipo
      </h2>

      {/* DISTRIBUCIÓN DE TIPOS */}
      <div>
        <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
          Distribución de Tipos
        </h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(analysis.typeDistribution).map(([type, count]) => (
            <span
              key={type}
              className="px-3 py-1 rounded-full text-sm font-semibold text-white capitalize flex items-center gap-2"
              style={{ backgroundColor: getTypeColor(type) }}
            >
              {type}
              <span className="bg-white bg-opacity-30 px-2 py-0.5 rounded-full text-xs">
                {count}
              </span>
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Cobertura de tipos: {analysis.typeCoverage} / 18 tipos
        </p>
      </div>

      {/* DEBILIDADES CRÍTICAS */}
      {analysis.criticalWeaknesses.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-3 text-red-600 dark:text-red-400">
            Debilidades Críticas
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Tipos que afectan a varios miembros del equipo.
          </p>
          <div className="flex flex-wrap gap-2">
            {analysis.criticalWeaknesses.map((type) => (
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

      {/* RESISTENCIAS FUERTES */}
      {analysis.commonResistances.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-3 text-green-600 dark:text-green-400">
            Resistencias Fuertes
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Tipos ante los que tu equipo tiene buena resistencia.
          </p>
          <div className="flex flex-wrap gap-2">
            {analysis.commonResistances.map((type) => (
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

      {/* INMUNIDADES */}
      {analysis.immunities.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-3 text-blue-600 dark:text-blue-400">
            Inmunidades
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.immunities.map((type) => (
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

      {/* PROMEDIO DE ESTADÍSTICAS */}
      <div>
        <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
          Promedio de Estadísticas del Equipo
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "HP",
            "Ataque",
            "Defensa",
            "Atq. Especial",
            "Def. Especial",
            "Velocidad",
          ].map((statName, index) => (
            <div
              key={statName}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {statName}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analysis.averageStats[index]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamAnalyzer;
