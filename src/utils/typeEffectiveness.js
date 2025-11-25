// Matriz de efectividad de tipos (simplificada)
export const typeEffectiveness = {
  fire: {
    superEffective: ["grass", "ice", "bug", "steel"],
    notVeryEffective: ["fire", "water", "rock", "dragon"],
  },
  water: {
    superEffective: ["fire", "ground", "rock"],
    notVeryEffective: ["water", "grass", "dragon"],
  },
  grass: {
    superEffective: ["water", "ground", "rock"],
    notVeryEffective: [
      "fire",
      "grass",
      "poison",
      "flying",
      "bug",
      "dragon",
      "steel",
    ],
  },
  electric: {
    superEffective: ["water", "flying"],
    notVeryEffective: ["electric", "grass", "dragon"],
    noEffect: ["ground"],
  },
  psychic: {
    superEffective: ["fighting", "poison"],
    notVeryEffective: ["psychic", "steel"],
    noEffect: ["dark"],
  },
  ice: {
    superEffective: ["grass", "ground", "flying", "dragon"],
    notVeryEffective: ["fire", "water", "ice", "steel"],
  },
  dragon: {
    superEffective: ["dragon"],
    notVeryEffective: ["steel"],
    noEffect: ["fairy"],
  },
  dark: {
    superEffective: ["psychic", "ghost"],
    notVeryEffective: ["fighting", "dark", "fairy"],
  },
  fairy: {
    superEffective: ["fighting", "dragon", "dark"],
    notVeryEffective: ["fire", "poison", "steel"],
  },
  fighting: {
    superEffective: ["normal", "ice", "rock", "dark", "steel"],
    notVeryEffective: ["poison", "flying", "psychic", "bug", "fairy"],
    noEffect: ["ghost"],
  },
  flying: {
    superEffective: ["grass", "fighting", "bug"],
    notVeryEffective: ["electric", "rock", "steel"],
  },
  poison: {
    superEffective: ["grass", "fairy"],
    notVeryEffective: ["poison", "ground", "rock", "ghost"],
    noEffect: ["steel"],
  },
  ground: {
    superEffective: ["fire", "electric", "poison", "rock", "steel"],
    notVeryEffective: ["grass", "bug"],
    noEffect: ["flying"],
  },
  rock: {
    superEffective: ["fire", "ice", "flying", "bug"],
    notVeryEffective: ["fighting", "ground", "steel"],
  },
  bug: {
    superEffective: ["grass", "psychic", "dark"],
    notVeryEffective: [
      "fire",
      "fighting",
      "poison",
      "flying",
      "ghost",
      "steel",
      "fairy",
    ],
  },
  ghost: {
    superEffective: ["psychic", "ghost"],
    notVeryEffective: ["dark"],
    noEffect: ["normal"],
  },
  steel: {
    superEffective: ["ice", "rock", "fairy"],
    notVeryEffective: ["fire", "water", "electric", "steel"],
  },
  normal: {
    superEffective: [],
    notVeryEffective: ["rock", "steel"],
    noEffect: ["ghost"],
  },
};

export function getTypeMatchup(attackerType, defenderTypes) {
  const effectiveness = typeEffectiveness[attackerType.toLowerCase()];
  if (!effectiveness) return { multiplier: 1, effectiveness: "normal" };

  let multiplier = 1;

  defenderTypes.forEach((defType) => {
    if (effectiveness.superEffective?.includes(defType)) {
      multiplier *= 2;
    }
    if (effectiveness.notVeryEffective?.includes(defType)) {
      multiplier *= 0.5;
    }
    if (effectiveness.noEffect?.includes(defType)) {
      multiplier *= 0;
    }
  });

  let effectivenessLabel = "normal";
  if (multiplier === 0) effectivenessLabel = "sin efecto";
  else if (multiplier < 1) effectivenessLabel = "poco eficaz";
  else if (multiplier > 1) effectivenessLabel = "súper eficaz";

  return { multiplier, effectiveness: effectivenessLabel };
}
