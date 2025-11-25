import { useTheme } from "../hooks/useTheme";
import { Search, Loader2, CheckCircle, XCircle, Info } from "lucide-react";

export default function SimpleSearch({
  searchTerm,
  setSearchTerm,
  orderBy,
  setOrderBy,
  searching,
  resultCount,
}) {
  const { colors } = useTheme();

  return (
    <div
      style={{
        background: colors.cardBackground,
        padding: "1.5rem",
        borderRadius: "10px",
        marginBottom: "1.5rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* Búsqueda */}
        <div style={{ flex: 1, minWidth: "250px", position: "relative" }}>
          <div style={{ position: "relative" }}>
            <Search
              size={20}
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: colors.textSecondary,
              }}
            />
            <input
              type="text"
              placeholder="Buscar Pokémon por nombre o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 3rem 0.75rem 3rem",
                border: `2px solid ${
                  searching ? colors.primary : colors.border
                }`,
                borderRadius: "8px",
                fontSize: "1rem",
                background: colors.background,
                color: colors.text,
                transition: "border-color 0.3s",
              }}
            />
            {searching && (
              <Loader2
                size={20}
                style={{
                  position: "absolute",
                  right: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: colors.primary,
                  animation: "spin 1s linear infinite",
                }}
              />
            )}
          </div>
        </div>

        {/* Ordenar */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <label style={{ color: colors.text, fontWeight: "600" }}>
            Ordenar:
          </label>
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
            style={{
              padding: "0.75rem",
              border: `2px solid ${colors.border}`,
              borderRadius: "8px",
              fontSize: "1rem",
              background: colors.background,
              color: colors.text,
              cursor: "pointer",
            }}
          >
            <option value="id-asc">ID: Menor a Mayor</option>
            <option value="id-desc">ID: Mayor a Menor</option>
            <option value="name-asc">Nombre: A-Z</option>
            <option value="name-desc">Nombre: Z-A</option>
          </select>
        </div>
      </div>

      {/* Indicador de resultados */}
      {searchTerm && !searching && resultCount !== null && (
        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1rem",
            background:
              resultCount > 0 ? `${colors.success}20` : `${colors.error}20`,
            border: `1px solid ${
              resultCount > 0 ? colors.success : colors.error
            }`,
            borderRadius: "8px",
            color: colors.text,
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {resultCount > 0 ? (
            <>
              <CheckCircle size={18} color={colors.success} />
              <span>
                Se {resultCount === 1 ? "encontró" : "encontraron"}{" "}
                <strong>{resultCount}</strong> Pokémon
                {resultCount === 20 &&
                  " (mostrando los primeros 20 resultados)"}
              </span>
            </>
          ) : (
            <>
              <XCircle size={18} color={colors.error} />
              <span>No se encontraron Pokémon con ese término</span>
            </>
          )}
        </div>
      )}

      {/* Ayuda para el usuario */}
      {searchTerm && searchTerm.length < 2 && (
        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1rem",
            background: `${colors.warning}20`,
            border: `1px solid ${colors.warning}`,
            borderRadius: "8px",
            color: colors.text,
            fontSize: "0.85rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Info size={18} color={colors.warning} />
          <span>Escribe al menos 2 caracteres para buscar por nombre</span>
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            from { transform: translateY(-50%) rotate(0deg); }
            to { transform: translateY(-50%) rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
