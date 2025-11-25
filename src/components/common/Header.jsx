import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import {
  FiSun,
  FiMoon,
  FiLogOut,
  FiUser,
  FiHome,
  FiBook,
  FiUsers,
  FiBarChart2,
} from "react-icons/fi";

const Header = () => {
  const { user, signOut, isAuthenticated } = useAuthContext();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="text-3xl transform group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              PokéWiki
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <FiHome />
              <span>Inicio</span>
            </Link>
            <Link
              to="/pokedex"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <FiBook />
              <span>Pokédex</span>
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/my-team"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  <FiUsers />
                  <span>Mi Equipo</span>
                </Link>
                <Link
                  to="/compare"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  <FiBarChart2 />
                  <span>Comparar</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  <FiUser />
                  <span>Perfil</span>
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Cambiar tema"
            >
              {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>

            {isAuthenticated ? (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
              >
                <FiLogOut />
                <span className="hidden sm:inline">Salir</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
              >
                Ingresar
              </Link>
            )}
          </div>
        </div>

        <nav className="md:hidden flex items-center gap-4 mt-4 overflow-x-auto pb-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg whitespace-nowrap"
          >
            <FiHome />
            <span>Inicio</span>
          </Link>
          <Link
            to="/pokedex"
            className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg whitespace-nowrap"
          >
            <FiBook />
            <span>Pokédex</span>
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to="/my-team"
                className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg whitespace-nowrap"
              >
                <FiUsers />
                <span>Equipo</span>
              </Link>
              <Link
                to="/compare"
                className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg whitespace-nowrap"
              >
                <FiBarChart2 />
                <span>Comparar</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;