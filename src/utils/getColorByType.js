export function getColorByType(type) {
  const colors = {
    fire: "rgba(240, 128, 48, 0.35)",
    water: "rgba(104, 144, 240, 0.35)",
    grass: "rgba(120, 200, 80, 0.35)",
    electric: "rgba(248, 208, 48, 0.35)",
    psychic: "rgba(248, 88, 136, 0.35)",
    ice: "rgba(152, 216, 216, 0.35)",
    dragon: "rgba(112, 56, 248, 0.35)",
    flying: "rgba(168, 144, 240, 0.35)",
    fairy: "rgba(238, 153, 172, 0.35)",
    ghost: "rgba(112, 88, 152, 0.35)",
    dark: "rgba(112, 88, 72, 0.35)",
    steel: "rgba(184, 184, 208, 0.35)",
    rock: "rgba(184, 160, 56, 0.35)",
    ground: "rgba(224, 192, 104, 0.35)",
    fighting: "rgba(192, 48, 40, 0.35)",
    bug: "rgba(168, 184, 32, 0.35)",
    poison: "rgba(160, 64, 160, 0.35)",
    normal: "rgba(168, 168, 120, 0.35)",
  };

  return colors[type?.toLowerCase()] || "rgba(255,255,255,0.35)";
}
