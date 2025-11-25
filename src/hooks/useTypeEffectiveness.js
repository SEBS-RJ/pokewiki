import { useMemo } from "react";
import {
  typeEffectiveness,
  calculateTypeEffectiveness,
  getTypeMatchups,
  getEffectivenessLabel,
  getEffectivenessColor,
} from "../utils/typeEffectiveness";

export const useTypeEffectiveness = (pokemonTypes) => {
  const matchups = useMemo(() => {
    if (!pokemonTypes || pokemonTypes.length === 0) return null;
    return getTypeMatchups(pokemonTypes);
  }, [pokemonTypes]);

  const calculateDamage = (attackingType) => {
    if (!pokemonTypes || pokemonTypes.length === 0) return 1;
    return calculateTypeEffectiveness(attackingType, pokemonTypes);
  };

  const getDefensiveMatchups = () => {
    return matchups;
  };

  const getOffensiveMatchups = (moveTypes) => {
    if (!moveTypes) return [];

    return moveTypes.map((moveType) => {
      const allTypes = Object.keys(typeEffectiveness);
      const effectiveness = {};

      allTypes.forEach((defenseType) => {
        const damage = calculateTypeEffectiveness(moveType, [defenseType]);
        if (!effectiveness[damage]) {
          effectiveness[damage] = [];
        }
        effectiveness[damage].push(defenseType);
      });

      return {
        type: moveType,
        effectiveness,
      };
    });
  };

  const compareTypes = (types1, types2) => {
    const matchups1 = getTypeMatchups(types1);
    const matchups2 = getTypeMatchups(types2);

    return {
      pokemon1: matchups1,
      pokemon2: matchups2,
      commonWeaknesses: matchups1.weaknesses.filter((w) =>
        matchups2.weaknesses.includes(w)
      ),
      commonResistances: matchups1.resistances.filter((r) =>
        matchups2.resistances.includes(r)
      ),
    };
  };

  const getEffectivenessInfo = (effectiveness) => {
    return {
      label: getEffectivenessLabel(effectiveness),
      color: getEffectivenessColor(effectiveness),
      multiplier: effectiveness,
    };
  };

  const getBestCounterTypes = () => {
    if (!matchups) return [];

    return matchups.weaknesses.map((type) => ({
      type,
      reason: "Super effective against this Pokemon",
    }));
  };

  const getWorstMatchupTypes = () => {
    if (!matchups) return [];

    return [...matchups.resistances, ...matchups.immunities].map((type) => ({
      type,
      reason: matchups.immunities.includes(type)
        ? "Immune to this type"
        : "Resists this type",
    }));
  };

  return {
    matchups,
    calculateDamage,
    getDefensiveMatchups,
    getOffensiveMatchups,
    compareTypes,
    getEffectivenessInfo,
    getBestCounterTypes,
    getWorstMatchupTypes,
  };
};
