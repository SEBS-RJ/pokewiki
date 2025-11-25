import { useState, useEffect } from "react";

export const usePokemonSearch = (allPokemonIndex = []) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = allPokemonIndex.filter(
      (p) => p.name.includes(q) || p.id.toString() === q
    );
    setResults(filtered);
  }, [query, allPokemonIndex]);

  return { query, setQuery, results };
};
