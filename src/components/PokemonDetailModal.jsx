import { usePokemonDetail } from "../hooks/usePokemonDetail";
import { useTheme } from "../hooks/useTheme";
import { getColorByType } from "../utils/getColorByType";
import { X, Ruler, Weight, Zap, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function PokemonDetailModal({
  pokemonId,
  onClose,
  onToggleCaptured,
  isCaptured,
}) {
  const { pokemon, species, evolutionChain, loading, error } =
    usePokemonDetail(pokemonId);
  const { colors, theme } = useTheme();

  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            background: colors.cardBackground,
            padding: "2rem",
            borderRadius: "10px",
            color: colors.text,
          }}
        >
          <h2>Cargando datos del Pokémon...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
        onClick={onClose}
      >
        <div
          style={{
            background: colors.cardBackground,
            padding: "2rem",
            borderRadius: "10px",
            color: colors.text,
          }}
        >
          <h2>Error: {error}</h2>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "1rem",
        overflowY: "auto",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: colors.cardBackground,
          padding: "2rem",
          borderRadius: "15px",
          maxWidth: "800px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          color: colors.text,
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h2 style={{ textTransform: "capitalize", margin: 0 }}>
            {pokemon.name} #{String(pokemon.id).padStart(3, "0")}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: colors.text,
              display: "flex",
              alignItems: "center",
              padding: "0.5rem",
            }}
          >
            <X size={28} />
          </button>
        </div>

        {/* Imagen y tipos */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            style={{ width: "200px", height: "200px" }}
          />
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              gap: "0.5rem",
              justifyContent: "center",
            }}
          >
            {pokemon.types.map((type) => (
              <span
                key={type}
                style={{
                  background: getColorByType(type),
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Descripción */}
        {species && (
          <div
            style={{
              background: theme === "dark" ? "#0f172a" : "#f1f5f9",
              padding: "1rem",
              borderRadius: "10px",
              marginBottom: "1.5rem",
            }}
          >
            <p style={{ margin: 0 }}>{species.description}</p>
            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "0.9rem",
                color: colors.textSecondary,
              }}
            >
              <strong>Generación:</strong> {species.generation} |{" "}
              <strong>Hábitat:</strong> {species.habitat}
            </p>
          </div>
        )}

        {/* Información física */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              background: theme === "dark" ? "#0f172a" : "#f1f5f9",
              padding: "1rem",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <Ruler size={20} color={colors.primary} />
              <h4 style={{ margin: 0 }}>Altura</h4>
            </div>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>
              {(pokemon.height / 10).toFixed(1)} m
            </p>
          </div>
          <div
            style={{
              background: theme === "dark" ? "#0f172a" : "#f1f5f9",
              padding: "1rem",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <Weight size={20} color={colors.primary} />
              <h4 style={{ margin: 0 }}>Peso</h4>
            </div>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>
              {(pokemon.weight / 10).toFixed(1)} kg
            </p>
          </div>
        </div>

        {/* Estadísticas */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Zap size={22} color={colors.primary} />
            Estadísticas Base
          </h3>
          {Object.entries(pokemon.stats).map(([stat, value]) => {
            const statNames = {
              hp: "HP",
              attack: "Ataque",
              defense: "Defensa",
              "special-attack": "Ataque Esp.",
              "special-defense": "Defensa Esp.",
              speed: "Velocidad",
            };
            return (
              <div key={stat} style={{ marginBottom: "0.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.25rem",
                  }}
                >
                  <span>{statNames[stat] || stat}</span>
                  <span style={{ fontWeight: "bold" }}>{value}</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "10px",
                    background: colors.border,
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${(value / 255) * 100}%`,
                      height: "100%",
                      background:
                        value > 100
                          ? colors.success
                          : value > 50
                          ? colors.warning
                          : colors.error,
                      transition: "width 0.3s",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Habilidades */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h3>Habilidades</h3>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {pokemon.abilities.map((ability, index) => (
              <div
                key={index}
                style={{
                  background: ability.isHidden ? colors.accent : colors.primary,
                  color: ability.isHidden ? "#fff" : "#1e293b",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  textTransform: "capitalize",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {ability.isHidden ? <EyeOff size={16} /> : <Eye size={16} />}
                {ability.name.replace("-", " ")}{" "}
                {ability.isHidden && "(Oculta)"}
              </div>
            ))}
          </div>
        </div>

        {/* Evoluciones */}
        {evolutionChain.length > 1 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h3>Cadena Evolutiva</h3>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {evolutionChain.map((evo, index) => (
                <div
                  key={evo.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.id}.png`}
                      alt={evo.name}
                      style={{ width: "80px", height: "80px" }}
                    />
                    <p style={{ margin: 0, textTransform: "capitalize" }}>
                      {evo.name}
                    </p>
                  </div>
                  {index < evolutionChain.length - 1 && (
                    <ArrowRight size={24} color={colors.primary} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Movimientos */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h3>Movimientos (primeros 10)</h3>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {pokemon.moves.map((move, index) => (
              <span
                key={index}
                style={{
                  background: theme === "dark" ? "#0f172a" : "#e2e8f0",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                  textTransform: "capitalize",
                  fontSize: "0.85rem",
                }}
              >
                {move.replace("-", " ")}
              </span>
            ))}
          </div>
        </div>

        {/* Botón capturar */}
        <button
          onClick={() => onToggleCaptured(pokemon.id)}
          style={{
            width: "100%",
            padding: "1rem",
            background: isCaptured ? colors.success : colors.primary,
            color: isCaptured ? "#fff" : "#1e293b",
            border: "none",
            borderRadius: "10px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          {isCaptured ? "✓ Capturado" : "Marcar como Capturado"}
        </button>
      </div>
    </div>
  );
}
