import { useTheme } from "../hooks/useTheme";
import { usePokemonDetail } from "../hooks/usePokemonDetail";
import { getColorByType } from "../utils/getColorByType";

function PokemonCompareCard({ pokemonId }) {
  const { pokemon, loading } = usePokemonDetail(pokemonId);
  const { colors, theme } = useTheme();

  if (loading || !pokemon) {
    return (
      <div
        style={{
          background: colors.cardBackground,
          padding: "1rem",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: colors.cardBackground,
        padding: "1.5rem",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={pokemon.image}
        alt={pokemon.name}
        style={{
          width: "150px",
          height: "150px",
          display: "block",
          margin: "0 auto",
        }}
      />
      <h3
        style={{
          textAlign: "center",
          textTransform: "capitalize",
          color: colors.text,
        }}
      >
        {pokemon.name} #{String(pokemon.id).padStart(3, "0")}
      </h3>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        {pokemon.types.map((type) => (
          <span
            key={type}
            style={{
              background: getColorByType(type),
              padding: "0.3rem 0.8rem",
              borderRadius: "15px",
              textTransform: "capitalize",
              fontSize: "0.85rem",
            }}
          >
            {type}
          </span>
        ))}
      </div>
      <div style={{ fontSize: "0.9rem", color: colors.text }}>
        {Object.entries(pokemon.stats).map(([stat, value]) => {
          const statNames = {
            hp: "HP",
            attack: "Ataque",
            defense: "Defensa",
            "special-attack": "At. Esp.",
            "special-defense": "Def. Esp.",
            speed: "Velocidad",
          };
          return (
            <div key={stat} style={{ marginBottom: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{statNames[stat] || stat}</span>
                <strong>{value}</strong>
              </div>
            </div>
          );
        })}
        <div
          style={{
            marginTop: "1rem",
            paddingTop: "1rem",
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          <p>
            <strong>Total:</strong>{" "}
            {Object.values(pokemon.stats).reduce((a, b) => a + b, 0)}
          </p>
          <p>
            <strong>Altura:</strong> {(pokemon.height / 10).toFixed(1)} m
          </p>
          <p>
            <strong>Peso:</strong> {(pokemon.weight / 10).toFixed(1)} kg
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PokemonComparison({ selectedIds, onRemove }) {
  const { colors } = useTheme();

  if (selectedIds.length === 0) {
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
        <h3>⚔️ Comparador de Pokémon</h3>
        <p>Selecciona entre 2 y 3 Pokémon para compararlos</p>
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
          ⚔️ Comparación de Pokémon
        </h3>
        <button
          onClick={() => selectedIds.forEach((id) => onRemove(id))}
          style={{
            padding: "0.5rem 1rem",
            background: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Limpiar Comparación
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            selectedIds.length === 2 ? "1fr 1fr" : "1fr 1fr 1fr",
          gap: "1.5rem",
        }}
      >
        {selectedIds.map((id) => (
          <div key={id} style={{ position: "relative" }}>
            <button
              onClick={() => onRemove(id)}
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                background: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
                fontSize: "1.2rem",
                zIndex: 10,
              }}
            >
              ×
            </button>
            <PokemonCompareCard pokemonId={id} />
          </div>
        ))}
      </div>

      {/* Análisis de ventajas */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          background: colors.background,
          borderRadius: "10px",
        }}
      >
        <h4 style={{ color: colors.text }}>💡 Análisis Rápido</h4>
        <p style={{ color: colors.textSecondary, fontSize: "0.9rem" }}>
          Compara las estadísticas totales, tipos y características físicas de
          los Pokémon seleccionados para determinar cuál se adapta mejor a tu
          estrategia de batalla.
        </p>
      </div>
    </div>
  );
}
