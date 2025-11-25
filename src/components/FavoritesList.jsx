import { useTheme } from "../hooks/useTheme";
import PokemonCard from "./PokemonCard";

export default function FavoritesList({
  favorites,
  pokemons,
  onRemoveFavorite,
  onExport,
}) {
  const { colors } = useTheme();

  const favoritePokemons = pokemons.filter((p) => favorites.includes(p.id));

  if (favorites.length === 0) {
    return (
      <div
        style={{
          background: colors.cardBackground,
          padding: "2rem",
          borderRadius: "10px",
          textAlign: "center",
          color: colors.text,
        }}
      >
        <h3>⭐ Tus Pokémon Favoritos</h3>
        <p>Aún no has agregado ningún Pokémon a favoritos</p>
        <p style={{ fontSize: "0.9rem", color: colors.textSecondary }}>
          Haz clic en la estrella de cualquier Pokémon para agregarlo aquí
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: colors.cardBackground,
        padding: "2rem",
        borderRadius: "10px",
        marginTop: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h3 style={{ color: colors.text, margin: 0 }}>
          ⭐ Tus Pokémon Favoritos ({favorites.length})
        </h3>
        <button
          onClick={onExport}
          style={{
            padding: "0.5rem 1rem",
            background: colors.primary,
            color: "#333",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📥 Exportar Lista
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {favoritePokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isFavorite={true}
            onToggleFavorite={onRemoveFavorite}
          />
        ))}
      </div>
    </div>
  );
}
