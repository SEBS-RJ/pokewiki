import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const authService = {
  signUp: async (email, password, username) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
    return { data, error };
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  },

  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};

export const dbService = {
  getCapturedPokemon: async (userId) => {
    const { data, error } = await supabase
      .from("captured_pokemon")
      .select("*")
      .eq("user_id", userId);
    return { data, error };
  },

  capturePokemon: async (userId, pokemonData) => {
    const { data, error } = await supabase.from("captured_pokemon").insert([
      {
        user_id: userId,
        pokemon_id: pokemonData.id,
        pokemon_name: pokemonData.name,
        pokemon_data: pokemonData,
        captured_at: new Date().toISOString(),
      },
    ]);
    return { data, error };
  },

  releasePokemon: async (captureId) => {
    const { data, error } = await supabase
      .from("captured_pokemon")
      .delete()
      .eq("id", captureId);
    return { data, error };
  },

  getUserTeam: async (userId) => {
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .eq("user_id", userId)
      .single();
    return { data, error };
  },

  saveUserTeam: async (userId, teamData) => {
    const { data, error } = await supabase.from("teams").upsert({
      user_id: userId,
      team_data: teamData,
      updated_at: new Date().toISOString(),
    });
    return { data, error };
  },

  getUserStats: async (userId) => {
    const { data, error } = await supabase
      .from("user_stats")
      .select("*")
      .eq("user_id", userId)
      .single();
    return { data, error };
  },

  updateUserStats: async (userId, stats) => {
    const { data, error } = await supabase.from("user_stats").upsert({
      user_id: userId,
      ...stats,
      updated_at: new Date().toISOString(),
    });
    return { data, error };
  },
};
