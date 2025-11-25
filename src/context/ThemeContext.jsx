import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("pokedex-theme");
    return saved || "light";
  });

  useEffect(() => {
    localStorage.setItem("pokedex-theme", theme);
    document.body.style.background = theme === "dark" ? "#0f172a" : "#f6f6f6";
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const colors = {
    light: {
      background: "#f6f6f6",
      cardBackground: "#ffffff",
      text: "#1e293b",
      textSecondary: "#64748b",
      border: "#e2e8f0",
      primary: "#fbbf24",
      secondary: "#3b82f6",
      accent: "#8b5cf6",
      success: "#10b981",
      error: "#ef4444",
      warning: "#f59e0b",
    },
    dark: {
      background: "#0f172a",
      cardBackground: "#1e293b",
      text: "#f1f5f9",
      textSecondary: "#94a3b8",
      border: "#334155",
      primary: "#fbbf24",
      secondary: "#60a5fa",
      accent: "#a78bfa",
      success: "#34d399",
      error: "#f87171",
      warning: "#fbbf24",
    },
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, colors: colors[theme] }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
