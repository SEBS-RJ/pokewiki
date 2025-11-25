import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { getColorByType } from "../utils/getColorByType";

export default function TeamBuilder({
  team,
  onAddToTeam,
  onRemoveFromTeam,
  pokemons,
}) {
  const { colors } = useTheme();
  const [teamName, setTeamName] = useState("");
  const [savedTeams, setSavedTeams] = useState(() => {
    const saved = localStorage.getItem("pokemon-teams");
    return saved ? JSON.parse(saved) : [];
  });

  const teamPokemons = pokemons.filter((p) => team.includes(p.id));

  const saveTeam = () => {
    if (!teamName || team.length === 0) {
      alert("Debes dar un nombre al equipo y tener al menos 1 Pokémon");
      return;
    }

    const newTeam = {
      id: Date.now(),
      name: teamName,
      pokemons: team,
      created: new Date().toLocaleDateString(),
    };

    const updatedTeams = [...savedTeams, newTeam];
    setSavedTeams(updatedTeams);
    localStorage.setItem("pokemon-teams", JSON.stringify(updatedTeams));
    setTeamName("");
    alert(`Equipo "${teamName}" guardado exitosamente!`);
  };

  const loadTeam = (teamData) => {
    teamData.pokemons.forEach((id) => {
      if (!team.includes(id)) {
        onAddToTeam(id);
      }
    });
  };

  const deleteTeam = (teamId) => {
    const updatedTeams = savedTeams.filter((t) => t.id !== teamId);
    setSavedTeams(updatedTeams);
    localStorage.setItem("pokemon-teams", JSON.stringify(updatedTeams));
  };

  // Análisis de cobertura de tipos
  const typeAnalysis = () => {
    const types = {};
    teamPokemons.forEach((p) => {
      p.types.forEach((type) => {
        types[type] = (types[type] || 0) + 1;
      });
    });
    return types;
  };

  const typeCoverage = typeAnalysis();

  return (
    <div
      style={{
        background: colors.cardBackground,
        padding: "2rem",
        borderRadius: "10px",
        marginTop: "2rem",
      }}
    >
      <h3 style={{ color: colors.text, marginBottom: "1.5rem" }}>
        🎒 Constructor de Equipo Pokémon ({team.length}/6)
      </h3>

      {/* Slots del equipo */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {[...Array(6)].map((_, index) => {
          const pokemon = teamPokemons[index];
          return (
            <div
              key={index}
              style={{
                background: colors.background,
                border: `2px dashed ${colors.border}`,
                borderRadius: "10px",
                padding: "1rem",
                textAlign: "center",
                minHeight: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {pokemon ? (
                <>
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    style={{ width: "80px" }}
                  />
                  <p
                    style={{
                      textTransform: "capitalize",
                      margin: "0.5rem 0",
                      color: colors.text,
                    }}
                  >
                    {pokemon.name}
                  </p>
                  <button
                    onClick={() => onRemoveFromTeam(pokemon.id)}
                    style={{
                      background: "#f44336",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      padding: "0.3rem 0.8rem",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    Quitar
                  </button>
                </>
              ) : (
                <div style={{ color: colors.textSecondary }}>
                  <p style={{ fontSize: "3rem", margin: 0 }}>+</p>
                  <p style={{ fontSize: "0.85rem" }}>Vacío</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Análisis de cobertura */}
      {team.length > 0 && (
        <div
          style={{
            background: colors.background,
            padding: "1.5rem",
            borderRadius: "10px",
            marginBottom: "2rem",
          }}
        >
          <h4 style={{ color: colors.text, marginBottom: "1rem" }}>
            📊 Análisis de Cobertura de Tipos
          </h4>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {Object.entries(typeCoverage).map(([type, count]) => (
              <div
                key={type}
                style={{
                  background: getColorByType(type),
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{ textTransform: "capitalize", fontWeight: "bold" }}
                >
                  {type}
                </span>
                <span
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    borderRadius: "50%",
                    width: "25px",
                    height: "25px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.85rem",
                  }}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>
          {Object.keys(typeCoverage).length < 5 && (
            <p
              style={{
                marginTop: "1rem",
                color: colors.textSecondary,
                fontSize: "0.9rem",
              }}
            >
              💡 Sugerencia: Agrega más variedad de tipos para mejor cobertura
              en combate
            </p>
          )}
        </div>
      )}

      {/* Guardar equipo */}
      {team.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h4 style={{ color: colors.text, marginBottom: "0.5rem" }}>
            💾 Guardar Equipo
          </h4>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              placeholder="Nombre del equipo..."
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              style={{
                flex: 1,
                padding: "0.75rem",
                border: `2px solid ${colors.border}`,
                borderRadius: "5px",
                fontSize: "1rem",
                background: colors.background,
                color: colors.text,
              }}
            />
            <button
              onClick={saveTeam}
              style={{
                padding: "0.75rem 1.5rem",
                background: colors.primary,
                color: "#333",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      {/* Equipos guardados */}
      {savedTeams.length > 0 && (
        <div>
          <h4 style={{ color: colors.text, marginBottom: "1rem" }}>
            📋 Equipos Guardados
          </h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {savedTeams.map((savedTeam) => (
              <div
                key={savedTeam.id}
                style={{
                  background: colors.background,
                  padding: "1rem",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h5 style={{ margin: "0 0 0.5rem 0", color: colors.text }}>
                    {savedTeam.name}
                  </h5>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.85rem",
                      color: colors.textSecondary,
                    }}
                  >
                    {savedTeam.pokemons.length} Pokémon - Creado:{" "}
                    {savedTeam.created}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => loadTeam(savedTeam)}
                    style={{
                      padding: "0.5rem 1rem",
                      background: colors.secondary,
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Cargar
                  </button>
                  <button
                    onClick={() => deleteTeam(savedTeam.id)}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#f44336",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
