import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PokemonProvider } from "./context/PokemonContext";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import MyTeam from "./pages/MyTeam";
import Compare from "./pages/Compare";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import "./styles/animations.css";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <PokemonProvider>
            <Router>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
                <Header />
                <main className="flex-1 container mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pokedex" element={<Pokedex />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route
                      path="/my-team"
                      element={
                        <ProtectedRoute>
                          <MyTeam />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </PokemonProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;