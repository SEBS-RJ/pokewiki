import React from "react";
import { usePokemonContext } from "../../context/PokemonContext";
import { FiAward, FiStar, FiTrendingUp, FiZap } from "react-icons/fi";

const AchievementBadges = () => {
  const { capturedPokemon, pokemonList } = usePokemonContext();

  const achievements = [
    {
      id: 1,
      title: "Primera Captura",
      description: "Captura tu primer Pokémon",
      icon: FiStar,
      unlocked: capturedPokemon.length >= 1,
      color: "bg-yellow-500",
    },
    {
      id: 2,
      title: "Entrenador Novato",
      description: "Captura 10 Pokémon",
      icon: FiAward,
      unlocked: capturedPokemon.length >= 10,
      color: "bg-blue-500",
    },
    {
      id: 3,
      title: "Entrenador Experimentado",
      description: "Captura 25 Pokémon",
      icon: FiTrendingUp,
      unlocked: capturedPokemon.length >= 25,
      color: "bg-purple-500",
    },
    {
      id: 4,
      title: "Maestro Entrenador",
      description: "Captura 50 Pokémon",
      icon: FiZap,
      unlocked: capturedPokemon.length >= 50,
      color: "bg-orange-500",
    },
    {
      id: 5,
      title: "Completador de Pokédex",
      description: "Captura todos los Pokémon disponibles",
      icon: FiAward,
      unlocked:
        pokemonList.length > 0 && capturedPokemon.length >= pokemonList.length,
      color: "bg-green-500",
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Logros
        </h2>
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
          {unlockedCount} / {achievements.length}
        </span>
      </div>

      <div className="space-y-4">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;

          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                achievement.unlocked
                  ? "border-transparent bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800"
                  : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 opacity-60"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`${
                    achievement.unlocked
                      ? achievement.color
                      : "bg-gray-400 dark:bg-gray-600"
                  } p-3 rounded-full text-white`}
                >
                  <Icon size={24} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {achievement.title}
                    </h3>

                    {achievement.unlocked && (
                      <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                        Desbloqueado
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementBadges;
