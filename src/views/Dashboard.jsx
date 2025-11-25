import { useState } from "react";
import { usePokemonData } from "../hooks/usePokemonData";
import { usePokemonSearch } from "../hooks/usePokemonSearch";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useTheme } from "../hooks/useTheme";
import { Book, Star, Swords, Backpack, ClipboardList } from "lucide-react";
import PokemonCard from "../components/PokemonCard";
import PokemonDetailModal from "../components/PokemonDetailModal";
import SimpleSearch from "../components/SimpleSearch";
import SmartPagination from "../components/SmartPagination";
import PokemonComparison from "../components/PokemonComparison";
import FavoritesList from "../components/FavoritesList";
import TeamBuilder from "../components/TeamBuilder";
import FormMultiStep from "../components/FormMultiStep";

export default function Dashboard() {
  const { colors } = useTheme();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("id-asc");
  const pokemonsPerPage = 21;
  const offset = (currentPage - 1) * pokemonsPerPage;

  const { pokemons, loading, error, totalCount } = usePokemonData(
    pokemonsPerPage,
    offset
  );
  const { searchResults, searching, searchError } =
    usePokemonSearch(searchTerm);

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [capturedPokemons, setCapturedPokemons] = useLocalStorage(
    "captured-pokemons",
    []
  );
  const [favoritePokemons, setFavoritePokemons] = useLocalStorage(
    "favorite-pokemons",
    []
  );
  const [comparisonList, setComparisonList] = useState([]);
  const [teamPokemons, setTeamPokemons] = useLocalStorage("team-pokemons", []);

  const [activeView, setActiveView] = useState("pokedex");

  const displayPokemons =
    searchTerm && searchTerm.length >= 1 ? searchResults : pokemons;

  const sortedPokemons = [...displayPokemons].sort((a, b) => {
    switch (orderBy) {
      case "id-asc":
        return a.id - b.id;
      case "id-desc":
        return b.id - a.id;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const toggleCaptured = (id) => {
    setCapturedPokemons((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleFavorite = (id) => {
    setFavoritePokemons((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleComparison = (id) => {
    setComparisonList((prev) => {
      if (prev.includes(id)) {
        return prev.filter((p) => p !== id);
      }
      if (prev.length >= 3) {
        alert("Solo puedes comparar hasta 3 Pokémon a la vez");
        return prev;
      }
      return [...prev, id];
    });
  };

  const toggleTeam = (id) => {
    setTeamPokemons((prev) => {
      if (prev.includes(id)) {
        return prev.filter((p) => p !== id);
      }
      if (prev.length >= 6) {
        alert("El equipo ya tiene 6 Pokémon");
        return prev;
      }
      return [...prev, id];
    });
  };

  const exportFavorites = () => {
    const favData = favoritePokemons
      .map((id) => {
        const pokemon = [...pokemons, ...searchResults].find(
          (p) => p.id === id
        );
        return pokemon
          ? { id: pokemon.id, name: pokemon.name, types: pokemon.types }
          : null;
      })
      .filter(Boolean);

    const dataStr = JSON.stringify(favData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mis-pokemon-favoritos.json";
    link.click();
  };

  const totalPages = Math.ceil(totalCount / pokemonsPerPage);

  const navigationViews = [
    { id: "pokedex", label: "Pokédex", icon: Book },
    {
      id: "favorites",
      label: `Favoritos (${favoritePokemons.length})`,
      icon: Star,
    },
    {
      id: "comparison",
      label: `Comparar (${comparisonList.length})`,
      icon: Swords,
    },
    { id: "team", label: `Equipo (${teamPokemons.length}/6)`, icon: Backpack },
    { id: "register", label: "Registro", icon: ClipboardList },
  ];

  return (
    <div style={{ padding: "1rem" }}>
      {/* Navegación de vistas */}
      <div
        style={{
          background: colors.cardBackground,
          padding: "1rem",
          borderRadius: "10px",
          marginBottom: "2rem",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {navigationViews.map((view) => {
          const IconComponent = view.icon;
          return (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              style={{
                padding: "0.75rem 1.5rem",
                background:
                  activeView === view.id ? colors.primary : colors.background,
                color: activeView === view.id ? "#1e293b" : colors.text,
                border: `2px solid ${
                  activeView === view.id ? colors.primary : colors.border
                }`,
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: activeView === view.id ? "bold" : "normal",
                fontSize: "1rem",
                transition: "all 0.3s",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <IconComponent size={20} />
              <span>{view.label}</span>
            </button>
          );
        })}
      </div>

      {/* Las vistas permanecen igual que antes... */}
      {activeView === "pokedex" && (
        <>
          <SimpleSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            searching={searching}
            resultCount={searchTerm ? sortedPokemons.length : null}
          />

          {/* Resto del código de la vista Pokédex igual... */}
          <div
            style={{
              background: colors.cardBackground,
              padding: "1.5rem",
              borderRadius: "10px",
              marginBottom: "1.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "1rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h4
                style={{
                  margin: "0 0 0.5rem 0",
                  color: colors.textSecondary,
                  fontSize: "0.9rem",
                }}
              >
                Total Pokémon
              </h4>
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  margin: 0,
                  color: colors.primary,
                }}
              >
                {searchTerm ? sortedPokemons.length : totalCount}
              </p>
              {searchTerm && (
                <p
                  style={{
                    fontSize: "0.75rem",
                    margin: "0.25rem 0 0 0",
                    color: colors.textSecondary,
                  }}
                >
                  en búsqueda
                </p>
              )}
            </div>
            <div style={{ textAlign: "center" }}>
              <h4
                style={{
                  margin: "0 0 0.5rem 0",
                  color: colors.textSecondary,
                  fontSize: "0.9rem",
                }}
              >
                Capturados
              </h4>
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  margin: 0,
                  color: colors.success,
                }}
              >
                {capturedPokemons.length}
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <h4
                style={{
                  margin: "0 0 0.5rem 0",
                  color: colors.textSecondary,
                  fontSize: "0.9rem",
                }}
              >
                Favoritos
              </h4>
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  margin: 0,
                  color: colors.warning,
                }}
              >
                {favoritePokemons.length}
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <h4
                style={{
                  margin: "0 0 0.5rem 0",
                  color: colors.textSecondary,
                  fontSize: "0.9rem",
                }}
              >
                En Equipo
              </h4>
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  margin: 0,
                  color: colors.secondary,
                }}
              >
                {teamPokemons.length}/6
              </p>
            </div>
          </div>

          {loading && !searchTerm ? (
            <div
              style={{
                background: colors.cardBackground,
                padding: "3rem",
                borderRadius: "10px",
                textAlign: "center",
                color: colors.text,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <p style={{ fontSize: "1.5rem" }}>
                ⏳ Cargando Pokémon desde PokéAPI...
              </p>
            </div>
          ) : error && !searchTerm ? (
            <div
              style={{
                background: colors.cardBackground,
                padding: "3rem",
                borderRadius: "10px",
                textAlign: "center",
                color: colors.error,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <p style={{ fontSize: "1.5rem" }}>{error}</p>
            </div>
          ) : searchError ? (
            <div
              style={{
                background: colors.cardBackground,
                padding: "3rem",
                borderRadius: "10px",
                textAlign: "center",
                color: colors.error,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <p style={{ fontSize: "1.5rem" }}>{searchError}</p>
              <button
                onClick={() => setSearchTerm("")}
                style={{
                  marginTop: "1rem",
                  padding: "0.75rem 1.5rem",
                  background: colors.primary,
                  color: "#1e293b",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Limpiar búsqueda
              </button>
            </div>
          ) : sortedPokemons.length === 0 && !searching ? (
            <div
              style={{
                background: colors.cardBackground,
                padding: "3rem",
                borderRadius: "10px",
                textAlign: "center",
                color: colors.text,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <p style={{ fontSize: "1.5rem" }}>No se encontraron Pokémon</p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  style={{
                    marginTop: "1rem",
                    padding: "0.75rem 1.5rem",
                    background: colors.primary,
                    color: "#1e293b",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Ver todos los Pokémon
                </button>
              )}
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                  gap: "1.5rem",
                  marginBottom: "2rem",
                }}
              >
                {sortedPokemons.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    onClick={() => setSelectedPokemon(pokemon.id)}
                    isSelected={comparisonList.includes(pokemon.id)}
                    isFavorite={favoritePokemons.includes(pokemon.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>

              {comparisonList.length > 0 && (
                <div
                  style={{
                    position: "fixed",
                    bottom: "2rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: colors.secondary,
                    padding: "1rem 2rem",
                    borderRadius: "50px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    color: "#fff",
                    zIndex: 100,
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>
                    {comparisonList.length} Pokémon seleccionados
                  </span>
                  <button
                    onClick={() => setActiveView("comparison")}
                    style={{
                      padding: "0.5rem 1rem",
                      background: colors.primary,
                      color: "#1e293b",
                      border: "none",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Ver Comparación
                  </button>
                  <button
                    onClick={() => setComparisonList([])}
                    style={{
                      padding: "0.5rem 1rem",
                      background: colors.error,
                      color: "#fff",
                      border: "none",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Limpiar
                  </button>
                </div>
              )}

              {!searchTerm && (
                <SmartPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </>
      )}

      {activeView === "favorites" && (
        <FavoritesList
          favorites={favoritePokemons}
          pokemons={[...pokemons, ...searchResults]}
          onRemoveFavorite={toggleFavorite}
          onExport={exportFavorites}
        />
      )}

      {activeView === "comparison" && (
        <>
          <PokemonComparison
            selectedIds={comparisonList}
            onRemove={toggleComparison}
          />

          {comparisonList.length === 0 && (
            <div
              style={{
                background: colors.cardBackground,
                padding: "2rem",
                borderRadius: "10px",
                marginTop: "2rem",
                textAlign: "center",
                color: colors.text,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <p style={{ fontSize: "1.1rem" }}>
                Ve a la Pokédex y selecciona entre 2 y 3 Pokémon haciendo clic
                en sus tarjetas
              </p>
              <button
                onClick={() => setActiveView("pokedex")}
                style={{
                  marginTop: "1rem",
                  padding: "0.75rem 1.5rem",
                  background: colors.primary,
                  color: "#1e293b",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                Ir a la Pokédex
              </button>
            </div>
          )}
        </>
      )}

      {activeView === "team" && (
        <>
          <TeamBuilder
            team={teamPokemons}
            onAddToTeam={toggleTeam}
            onRemoveFromTeam={toggleTeam}
            pokemons={pokemons}
          />

          <div
            style={{
              background: colors.cardBackground,
              padding: "2rem",
              borderRadius: "10px",
              marginTop: "2rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ color: colors.text, marginBottom: "1rem" }}>
              Agregar Pokémon al Equipo
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "1rem",
              }}
            >
              {pokemons.slice(0, 12).map((pokemon) => (
                <div
                  key={pokemon.id}
                  style={{ position: "relative" }}
                  onClick={() => toggleTeam(pokemon.id)}
                >
                  <PokemonCard
                    pokemon={pokemon}
                    isSelected={teamPokemons.includes(pokemon.id)}
                  />
                  {teamPokemons.includes(pokemon.id) && (
                    <div
                      style={{
                        position: "absolute",
                        top: "0.5rem",
                        left: "0.5rem",
                        background: colors.success,
                        color: "#fff",
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                      }}
                    >
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeView === "register" && (
        <section
          style={{
            padding: "2rem",
            background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <h2
            style={{
              color: colors.text,
              marginBottom: "0.5rem",
              textAlign: "center",
            }}
          >
            Registro de Nuevo Entrenador Pokémon
          </h2>
          <p
            style={{
              textAlign: "center",
              color: colors.textSecondary,
              marginBottom: "1.5rem",
            }}
          >
            Completa tu perfil de entrenador en 3 sencillos pasos
          </p>
          <FormMultiStep />
        </section>
      )}

      {selectedPokemon && (
        <PokemonDetailModal
          pokemonId={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
          onToggleCaptured={toggleCaptured}
          isCaptured={capturedPokemons.includes(selectedPokemon)}
        />
      )}
    </div>
  );
}
