import { useState, useEffect } from "react";
import { storage } from "../services/storage";
import { dbService } from "../services/supabase";
import { useAuth } from "./useAuth";

export const useCapturedPokemon = () => {
  const [capturedPokemon, setCapturedPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    loadCapturedPokemon();
  }, [user]);

  const loadCapturedPokemon = async () => {
    try {
      setLoading(true);

      if (user) {
        const { data, error: dbError } = await dbService.getCapturedPokemon(
          user.id
        );
        if (dbError) throw dbError;
        setCapturedPokemon(data || []);
      } else {
        const localData = storage.getCapturedPokemon();
        setCapturedPokemon(localData);
      }
    } catch (err) {
      setError(err.message);
      const localData = storage.getCapturedPokemon();
      setCapturedPokemon(localData);
    } finally {
      setLoading(false);
    }
  };

  const capturePokemon = async (pokemon) => {
    try {
      const isCaptured = capturedPokemon.some(
        (p) => p.pokemon_id === pokemon.id || p.id === pokemon.id
      );
      if (isCaptured) {
        return { success: false, message: "Pokemon already captured!" };
      }

      if (user) {
        const { data, error: captureError } = await dbService.capturePokemon(
          user.id,
          pokemon
        );
        if (captureError) throw captureError;
        setCapturedPokemon((prev) => [...prev, data[0]]);
      } else {
        storage.addCapturedPokemon(pokemon);
        const updated = storage.getCapturedPokemon();
        setCapturedPokemon(updated);
      }

      return { success: true, message: "Pokemon captured successfully!" };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  const releasePokemon = async (pokemonId) => {
    try {
      if (user) {
        const captureRecord = capturedPokemon.find(
          (p) => p.pokemon_id === pokemonId
        );
        if (captureRecord) {
          const { error: releaseError } = await dbService.releasePokemon(
            captureRecord.id
          );
          if (releaseError) throw releaseError;
        }
        setCapturedPokemon((prev) =>
          prev.filter((p) => p.pokemon_id !== pokemonId)
        );
      } else {
        storage.removeCapturedPokemon(pokemonId);
        const updated = storage.getCapturedPokemon();
        setCapturedPokemon(updated);
      }

      return { success: true, message: "Pokemon released!" };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  const isCaptured = (pokemonId) => {
    return capturedPokemon.some(
      (p) => p.pokemon_id === pokemonId || p.id === pokemonId
    );
  };

  const getCapturedCount = () => {
    return capturedPokemon.length;
  };

  return {
    capturedPokemon,
    loading,
    error,
    capturePokemon,
    releasePokemon,
    isCaptured,
    getCapturedCount,
    refresh: loadCapturedPokemon,
  };
};
