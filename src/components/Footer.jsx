import { useTheme } from "../hooks/useTheme";

export default function Footer() {
  const { colors } = useTheme();

  return (
    <footer
      style={{
        padding: "1.5rem",
        background: colors.secondary,
        color: "#fff",
        marginTop: "3rem",
        textAlign: "center",
      }}
    >
      <p style={{ margin: 0 }}>
        © 2025 Pokédex React – Proyecto de práctica con PokéAPI
      </p>
      <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.85rem", opacity: 0.8 }}>
        Datos proporcionados por{" "}
        <a
          href="https://pokeapi.co"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: colors.primary, textDecoration: "none" }}
        >
          PokéAPI
        </a>
      </p>
    </footer>
  );
}
