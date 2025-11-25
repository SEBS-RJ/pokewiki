import { useState, useEffect } from "react";

export function usePokemonData(limit = 20, offset = 0) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        const data = await response.json();
        setTotalCount(data.count);

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );

        const formattedPokemons = pokemonDetails.map((p) => ({
          id: p.id,
          name: p.name,
          image: p.sprites.front_default,
          types: p.types.map((t) => t.type.name),
          stats: p.stats.reduce((acc, stat) => {
            acc[stat.stat.name] = stat.base_stat;
            return acc;
          }, {}),
          height: p.height,
          weight: p.weight,
          abilities: p.abilities.map((a) => a.ability.name),
        }));

        setPokemons(formattedPokemons);
      } catch (err) {
        setError("Error al cargar los Pokémon. Intenta nuevamente.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [limit, offset]);

  return { pokemons, loading, error, totalCount };
}
