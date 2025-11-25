export const typeEffectiveness = {
  normal: {
    weakTo: ["fighting"],
    resistantTo: [],
    immuneTo: ["ghost"],
  },
  fire: {
    weakTo: ["water", "ground", "rock"],
    resistantTo: ["fire", "grass", "ice", "bug", "steel", "fairy"],
    immuneTo: [],
  },
  water: {
    weakTo: ["electric", "grass"],
    resistantTo: ["fire", "water", "ice", "steel"],
    immuneTo: [],
  },
  electric: {
    weakTo: ["ground"],
    resistantTo: ["electric", "flying", "steel"],
    immuneTo: [],
  },
  grass: {
    weakTo: ["fire", "ice", "poison", "flying", "bug"],
    resistantTo: ["water", "electric", "grass", "ground"],
    immuneTo: [],
  },
  ice: {
    weakTo: ["fire", "fighting", "rock", "steel"],
    resistantTo: ["ice"],
    immuneTo: [],
  },
  fighting: {
    weakTo: ["flying", "psychic", "fairy"],
    resistantTo: ["bug", "rock", "dark"],
    immuneTo: [],
  },
  poison: {
    weakTo: ["ground", "psychic"],
    resistantTo: ["grass", "fighting", "poison", "bug", "fairy"],
    immuneTo: [],
  },
  ground: {
    weakTo: ["water", "grass", "ice"],
    resistantTo: ["poison", "rock"],
    immuneTo: ["electric"],
  },
  flying: {
    weakTo: ["electric", "ice", "rock"],
    resistantTo: ["grass", "fighting", "bug"],
    immuneTo: ["ground"],
  },
  psychic: {
    weakTo: ["bug", "ghost", "dark"],
    resistantTo: ["fighting", "psychic"],
    immuneTo: [],
  },
  bug: {
    weakTo: ["fire", "flying", "rock"],
    resistantTo: ["grass", "fighting", "ground"],
    immuneTo: [],
  },
  rock: {
    weakTo: ["water", "grass", "fighting", "ground", "steel"],
    resistantTo: ["normal", "fire", "poison", "flying"],
    immuneTo: [],
  },
  ghost: {
    weakTo: ["ghost", "dark"],
    resistantTo: ["poison", "bug"],
    immuneTo: ["normal", "fighting"],
  },
  dragon: {
    weakTo: ["ice", "dragon", "fairy"],
    resistantTo: ["fire", "water", "electric", "grass"],
    immuneTo: [],
  },
  dark: {
    weakTo: ["fighting", "bug", "fairy"],
    resistantTo: ["ghost", "dark"],
    immuneTo: ["psychic"],
  },
  steel: {
    weakTo: ["fire", "fighting", "ground"],
    resistantTo: [
      "normal",
      "grass",
      "ice",
      "flying",
      "psychic",
      "bug",
      "rock",
      "dragon",
      "steel",
      "fairy",
    ],
    immuneTo: ["poison"],
  },
  fairy: {
    weakTo: ["poison", "steel"],
    resistantTo: ["fighting", "bug", "dark"],
    immuneTo: ["dragon"],
  },
};

export const calculateTypeEffectiveness = (attackingType, defendingTypes) => {
  let effectiveness = 1;

  defendingTypes.forEach((defenseType) => {
    const defenseData = typeEffectiveness[defenseType.toLowerCase()];

    if (defenseData.immuneTo.includes(attackingType.toLowerCase())) {
      effectiveness = 0;
    } else if (defenseData.weakTo.includes(attackingType.toLowerCase())) {
      effectiveness *= 2;
    } else if (defenseData.resistantTo.includes(attackingType.toLowerCase())) {
      effectiveness *= 0.5;
    }
  });

  return effectiveness;
};

export const getEffectivenessLabel = (effectiveness) => {
  if (effectiveness === 0) return "Immune";
  if (effectiveness === 0.25) return "Not Very Effective (x0.25)";
  if (effectiveness === 0.5) return "Not Very Effective (x0.5)";
  if (effectiveness === 1) return "Normal";
  if (effectiveness === 2) return "Super Effective (x2)";
  if (effectiveness === 4) return "Super Effective (x4)";
  return "Normal";
};

export const getEffectivenessColor = (effectiveness) => {
  if (effectiveness === 0) return "#999999";
  if (effectiveness < 1) return "#FF6B6B";
  if (effectiveness === 1) return "#4ECDC4";
  if (effectiveness > 1) return "#95E1D3";
  return "#4ECDC4";
};

export const getTypeMatchups = (types) => {
  const weaknesses = new Set();
  const resistances = new Set();
  const immunities = new Set();

  types.forEach((type) => {
    const typeData = typeEffectiveness[type.toLowerCase()];
    if (typeData) {
      typeData.weakTo.forEach((t) => weaknesses.add(t));
      typeData.resistantTo.forEach((t) => resistances.add(t));
      typeData.immuneTo.forEach((t) => immunities.add(t));
    }
  });

  return {
    weaknesses: Array.from(weaknesses),
    resistances: Array.from(resistances),
    immunities: Array.from(immunities),
  };
};
