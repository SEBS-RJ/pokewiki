import React from "react";
import { FiGithub, FiTwitter, FiHeart } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              PokéWiki
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Construye y administra tu equipo perfecto de Pokémon. Explora, captura y 
              estrategiza con tus Pokémon favoritos.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="/pokedex"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  Pokédex
                </a>
              </li>
              <li>
                <a
                  href="/my-team"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  Mi Equipo
                </a>
              </li>
              <li>
                <a
                  href="/compare"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  Comparar
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Conectar
            </h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
            {currentYear} PokéWiki. Todos los derechos reservados.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
            Hecho con <FiHeart className="text-red-500" /> para fanáticos de Pokémon
          </p>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-500">
          Pokémon y los nombres de los personajes Pokémon son marcas registradas de Nintendo.
          <br />
          Este es un proyecto de fans y no está afiliado con Nintendo, Game Freak o The Pokémon Company.
        </div>
      </div>
    </footer>
  );
};

export default Footer;