export const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

export const typeGradients = {
  normal: "linear-gradient(135deg, #A8A878 0%, #C0C0A8 100%)",
  fire: "linear-gradient(135deg, #F08030 0%, #F8A058 100%)",
  water: "linear-gradient(135deg, #6890F0 0%, #88A8F8 100%)",
  electric: "linear-gradient(135deg, #F8D030 0%, #F8E858 100%)",
  grass: "linear-gradient(135deg, #78C850 0%, #90D868 100%)",
  ice: "linear-gradient(135deg, #98D8D8 0%, #B0E8E8 100%)",
  fighting: "linear-gradient(135deg, #C03028 0%, #D04838 100%)",
  poison: "linear-gradient(135deg, #A040A0 0%, #B058B0 100%)",
  ground: "linear-gradient(135deg, #E0C068 0%, #E8D088 100%)",
  flying: "linear-gradient(135deg, #A890F0 0%, #B8A8F8 100%)",
  psychic: "linear-gradient(135deg, #F85888 0%, #F878A0 100%)",
  bug: "linear-gradient(135deg, #A8B820 0%, #B8C838 100%)",
  rock: "linear-gradient(135deg, #B8A038 0%, #C8B050 100%)",
  ghost: "linear-gradient(135deg, #705898 0%, #8870B0 100%)",
  dragon: "linear-gradient(135deg, #7038F8 0%, #8858F8 100%)",
  dark: "linear-gradient(135deg, #705848 0%, #887060 100%)",
  steel: "linear-gradient(135deg, #B8B8D0 0%, #C8C8E0 100%)",
  fairy: "linear-gradient(135deg, #EE99AC 0%, #F8B0C0 100%)",
};

export const getTypeColor = (type) => {
  return typeColors[type?.toLowerCase()] || typeColors.normal;
};

export const getTypeGradient = (type) => {
  return typeGradients[type?.toLowerCase()] || typeGradients.normal;
};

export const getTextColorForType = (type) => {
  const darkTypes = ["fighting", "poison", "ghost", "dragon", "dark", "rock"];
  return darkTypes.includes(type?.toLowerCase()) ? "#ffffff" : "#000000";
};
