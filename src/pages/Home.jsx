import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { usePokemonContext } from "../context/PokemonContext";
import PokemonSilhouette from "../components/pokemon/PokemonSilhouette";
import { FiBook, FiUsers, FiBarChart2, FiUser } from "react-icons/fi";

const Home = () => {
  const { isAuthenticated } = useAuthContext();
  const { pokemonList, getCapturedCount } = usePokemonContext();
  const [randomPokemon] = useState(() => {
    const random = pokemonList[Math.floor(Math.random() * pokemonList.length)];
    return random || null;
  });
  const [revealed, setRevealed] = useState(false);

  const features = [
    {
      title: "Pokédex",
      description: "Explora y captura Pokémon de todas las generaciones",
      icon: FiBook,
      link: "/pokedex",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Mi Equipo",
      description: "Crea y administra tu equipo Pokémon ideal",
      icon: FiUsers,
      link: "/my-team",
      color: "from-purple-500 to-purple-600",
      requiresAuth: true,
    },
    {
      title: "Comparar",
      description: "Compara estadísticas y tipos entre Pokémon",
      icon: FiBarChart2,
      link: "/compare",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Perfil",
      description: "Consulta tus estadísticas y logros",
      icon: FiUser,
      link: "/profile",
      color: "from-orange-500 to-orange-600",
      requiresAuth: true,
    },
  ];

  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Bienvenido a PokéWiki
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Crea tu equipo Pokémon definitivo, explora la Pokédex y conviértete en un maestro entrenador
        </p>
        {isAuthenticated ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              ¡Has capturado{" "}
              <span className="font-bold text-blue-500">
                {getCapturedCount()}
              </span>{" "}
              Pokémon!
            </p>
            <Link
              to="/pokedex"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors text-lg"
            >
              Continúa tu aventura
            </Link>
          </div>
        ) : (
          <Link
            to="/login"
            className="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors text-lg"
          >
            Comienza tu aventura
          </Link>
        )}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          const isDisabled = feature.requiresAuth && !isAuthenticated;

          return (
            <Link
              key={feature.title}
              to={isDisabled ? "/login" : feature.link}
              className={`group relative overflow-hidden rounded-lg p-6 text-white transition-transform hover:scale-105 ${
                isDisabled ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-90`}
              />
              <div className="relative z-10">
                <Icon size={40} className="mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm opacity-90">{feature.description}</p>
                {isDisabled && (
                  <p className="text-xs mt-2 opacity-75">Se requiere iniciar sesión</p>
                )}
              </div>
            </Link>
          );
        })}
      </section>

      {randomPokemon && (
        <section className="py-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Desafío del día
          </h2>
          <PokemonSilhouette
            pokemon={randomPokemon}
            revealed={revealed}
            onReveal={setRevealed}
          />
        </section>
      )}

      <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para atraparlos a todos?</h2>
        <p className="text-lg mb-6 opacity-90">
          Únete a miles de entrenadores construyendo sus equipos soñados
        </p>
        {!isAuthenticated && (
          <Link
            to="/login"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Regístrate ahora
          </Link>
        )}
      </section>
    </div>
  );
};

export default Home;
