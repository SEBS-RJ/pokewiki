import { useTheme } from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "0.6rem 1.2rem",
        background: colors.cardBackground,
        color: colors.text,
        border: `2px solid ${colors.border}`,
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
      }}
    >
      {theme === "dark" ? (
        <>
          <Sun size={20} />
          <span>Claro</span>
        </>
      ) : (
        <>
          <Moon size={20} />
          <span>Oscuro</span>
        </>
      )}
    </button>
  );
}
