import { getBackgroundByTypes } from "../utils/getBackgroundByTypes";
import { useTheme } from "../hooks/useTheme";

export default function PokemonCard({
  pokemon,
  onClick,
  isSelected,
  isFavorite,
  onToggleFavorite,
}) {
  const { colors } = useTheme();
  const types = Array.isArray(pokemon.types)
    ? pokemon.types
    : pokemon.type?.split("/") || [];
  const background = getBackgroundByTypes(types.join("/"));

  return (
    <div
      onClick={onClick}
      style={{
        background,
        borderRadius: "10px",
        padding: "1rem",
        width: "150px",
        textAlign: "center",
        boxShadow: isSelected
          ? `0 0 15px ${colors.primary}`
          : "0 2px 5px rgba(0,0,0,0.2)",
        backdropFilter: "blur(3px)",
        color: colors.text,
        cursor: "pointer",
        position: "relative",
        transition: "transform 0.2s, box-shadow 0.2s",
        border: isSelected ? `3px solid ${colors.primary}` : "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {onToggleFavorite && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(pokemon.id);
          }}
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            background: "transparent",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          {isFavorite ? "⭐" : "☆"}
        </button>
      )}

      <img
        src={pokemon.image}
        alt={pokemon.name}
        style={{ width: "90px", height: "90px" }}
      />
      <h4 style={{ textTransform: "capitalize", margin: "0.5rem 0" }}>
        {pokemon.name}
      </h4>
      <p style={{ fontSize: "0.75rem", margin: "0.25rem 0" }}>
        #{String(pokemon.id).padStart(3, "0")}
      </p>
      <p style={{ fontSize: "0.85rem" }}>
        {types.map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" / ")}
      </p>
    </div>
  );
}
