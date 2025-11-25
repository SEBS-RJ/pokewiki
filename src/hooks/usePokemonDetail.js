import { useState, useEffect } from "react";

export function usePokemonDetail(pokemonId) {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonId) return;

    const fetchPokemonDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        // Obtener datos básicos del Pokémon
        const pokemonRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        const pokemonData = await pokemonRes.json();

        // Obtener datos de la especie (descripción, evoluciones)
        const speciesRes = await fetch(pokemonData.species.url);
        const speciesData = await speciesRes.json();

        // Obtener cadena de evolución
        const evolutionRes = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionRes.json();

        // Procesar cadena de evolución
        const evolutions = [];
        let current = evolutionData.chain;

        while (current) {
          const evolutionId = current.species.url.split("/").slice(-2, -1)[0];
          evolutions.push({
            name: current.species.name,
            id: evolutionId,
          });
          current = current.evolves_to[0];
        }

        // Obtener descripción en español
        const description =
          speciesData.flavor_text_entries.find(
            (entry) => entry.language.name === "es"
          )?.flavor_text ||
          speciesData.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
          )?.flavor_text ||
          "Sin descripción disponible.";

        setPokemon({
          id: pokemonData.id,
          name: pokemonData.name,
          image: pokemonData.sprites.other["official-artwork"].front_default,
          types: pokemonData.types.map((t) => t.type.name),
          stats: pokemonData.stats.reduce((acc, stat) => {
            acc[stat.stat.name] = stat.base_stat;
            return acc;
          }, {}),
          height: pokemonData.height,
          weight: pokemonData.weight,
          abilities: pokemonData.abilities.map((a) => ({
            name: a.ability.name,
            isHidden: a.is_hidden,
          })),
          moves: pokemonData.moves.slice(0, 10).map((m) => m.move.name),
        });

        setSpecies({
          description: description.replace(/\f/g, " "),
          generation: speciesData.generation.name,
          habitat: speciesData.habitat?.name || "desconocido",
        });

        setEvolutionChain(evolutions);
      } catch (err) {
        setError("Error al cargar los detalles del Pokémon.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [pokemonId]);

  return { pokemon, species, evolutionChain, loading, error };
}
