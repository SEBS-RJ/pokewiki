import { useTheme } from "../hooks/useTheme";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  const { colors } = useTheme();

  return (
    <div style={{ minHeight: "100vh", background: colors.background }}>
      <Header />
      <main
        style={{ padding: "2rem 1rem", maxWidth: "1400px", margin: "0 auto" }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
