import { useTheme } from "../hooks/useTheme";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function SmartPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const { colors } = useTheme();

  const handlePageInput = (e) => {
    const page = parseInt(e.target.value);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handlePageInput(e);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;

    if (totalPages <= showPages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage <= 3) {
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div
      style={{
        background: colors.cardBackground,
        padding: "1.5rem",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Controles principales */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        {/* Botones de navegación izquierda */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            style={{
              padding: "0.75rem",
              background: currentPage === 1 ? colors.border : colors.background,
              color: currentPage === 1 ? colors.textSecondary : colors.text,
              border: `2px solid ${colors.border}`,
              borderRadius: "8px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            title="Primera página"
          >
            <ChevronsLeft size={20} />
          </button>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "0.75rem 1.25rem",
              background: currentPage === 1 ? colors.border : colors.primary,
              color: currentPage === 1 ? colors.textSecondary : "#1e293b",
              border: "none",
              borderRadius: "8px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <ChevronLeft size={20} />
            Anterior
          </button>
        </div>

        {/* Números de página */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  style={{
                    padding: "0.75rem 0.5rem",
                    color: colors.text,
                    fontWeight: "bold",
                  }}
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                style={{
                  padding: "0.75rem 1rem",
                  background:
                    currentPage === page ? colors.primary : colors.background,
                  color: currentPage === page ? "#1e293b" : colors.text,
                  border: `2px solid ${
                    currentPage === page ? colors.primary : colors.border
                  }`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: currentPage === page ? "bold" : "normal",
                  minWidth: "45px",
                  fontSize: "1rem",
                }}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Botones de navegación derecha */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: "0.75rem 1.25rem",
              background:
                currentPage === totalPages ? colors.border : colors.primary,
              color:
                currentPage === totalPages ? colors.textSecondary : "#1e293b",
              border: "none",
              borderRadius: "8px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            Siguiente
            <ChevronRight size={20} />
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            style={{
              padding: "0.75rem",
              background:
                currentPage === totalPages ? colors.border : colors.background,
              color:
                currentPage === totalPages ? colors.textSecondary : colors.text,
              border: `2px solid ${colors.border}`,
              borderRadius: "8px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            title="Última página"
          >
            <ChevronsRight size={20} />
          </button>
        </div>
      </div>

      {/* Salto rápido a página */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          paddingTop: "1rem",
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <label style={{ color: colors.text, fontWeight: "600" }}>
          Ir a página:
        </label>
        <input
          type="number"
          min="1"
          max={totalPages}
          defaultValue={currentPage}
          onBlur={handlePageInput}
          onKeyPress={handleKeyPress}
          style={{
            width: "80px",
            padding: "0.5rem",
            border: `2px solid ${colors.border}`,
            borderRadius: "5px",
            fontSize: "1rem",
            background: colors.background,
            color: colors.text,
            textAlign: "center",
          }}
        />
        <span style={{ color: colors.textSecondary }}>de {totalPages}</span>
      </div>
    </div>
  );
}
