import { useTheme } from "../hooks/useTheme";
import { Zap } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { colors } = useTheme();

  return (
    <header
      style={{
        padding: "1rem 2rem",
        background: colors.primary,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <Zap size={32} color="#1e293b" strokeWidth={2.5} />
        <div>
          <h1 style={{ margin: 0, color: "#1e293b", fontSize: "1.8rem" }}>
            Pokédex React
          </h1>
          <p
            style={{
              margin: "0.25rem 0 0 0",
              color: "#334155",
              fontSize: "0.9rem",
            }}
          >
            Explora, gestiona y descubre Pokémon
          </p>
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
}
