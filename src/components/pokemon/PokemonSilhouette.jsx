import React, { useState } from "react";
import {
  getPokemonImageUrl,
  formatPokemonName,
} from "../../utils/pokemonHelpers";

const PokemonSilhouette = ({ pokemon, revealed, onReveal }) => {
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleGuess = () => {
    if (guess.toLowerCase() === pokemon.name.toLowerCase()) {
      setFeedback("¡Correcto! 🎉");
      onReveal && onReveal(true);
    } else {
      setFeedback("¡Inténtalo de nuevo!");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        ¿Quién es ese Pokémon?
      </h2>

      <div className="relative h-64 flex items-center justify-center mb-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg p-4">
        <img
          src={getPokemonImageUrl(pokemon.id, "official")}
          alt="Pokémon misterioso"
          className={`w-full h-full object-contain transition-all duration-500 ${
            revealed ? "filter-none" : "brightness-0"
          }`}
        />
      </div>

      {!revealed ? (
        <div className="space-y-4">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleGuess()}
            placeholder="Ingresa el nombre del Pokémon..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />

          {feedback && (
            <p
              className={`text-center font-semibold ${
                feedback.includes("Correct") || feedback.includes("¡Correcto!")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {feedback}
            </p>
          )}

          <button
            onClick={handleGuess}
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
          >
            Adivinar
          </button>

          <button
            onClick={() => onReveal && onReveal(true)}
            className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
          >
            Revelar
          </button>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
            {formatPokemonName(pokemon.name)}
          </h3>

          <p className="text-gray-600 dark:text-gray-400">
            #{pokemon.id.toString().padStart(3, "0")}
          </p>

          <div className="flex gap-2 justify-center">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="px-3 py-1 text-sm font-semibold text-white rounded-full capitalize"
                style={{
                  backgroundColor:
                    require("../../utils/typeColors").getTypeColor(
                      type.type.name
                    ),
                }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonSilhouette;
