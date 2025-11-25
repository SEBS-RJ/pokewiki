import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { storage } from "../services/storage";
import { dbService } from "../services/supabase";
import TeamBuilder from "../components/team/TeamBuilder";
import TeamAnalyzer from "../components/team/TeamAnalyzer";
import Loading from "../components/common/Loading";
import { FiSave, FiRefreshCw } from "react-icons/fi";

const MyTeam = () => {
  const { user } = useAuthContext();
  const [team, setTeam] = useState(Array(6).fill(null));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTeam();
  }, [user]);

  const loadTeam = async () => {
    try {
      setLoading(true);
      if (user) {
        const { data, error } = await dbService.getUserTeam(user.id);
        if (!error && data?.team_data) {
          setTeam(data.team_data);
        } else {
          setTeam(Array(6).fill(null));
        }
      } else {
        const localTeam = storage.getUserTeam();
        setTeam(localTeam.length > 0 ? localTeam : Array(6).fill(null));
      }
    } catch (error) {
      console.error("Error al cargar el equipo:", error);
      const localTeam = storage.getUserTeam();
      setTeam(localTeam.length > 0 ? localTeam : Array(6).fill(null));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTeam = (newTeam) => {
    setTeam(newTeam);
  };

  const handleSaveTeam = async () => {
    try {
      setSaving(true);
      if (user) {
        await dbService.saveUserTeam(user.id, team);
        alert("¡Equipo guardado exitosamente!");
      } else {
        storage.saveUserTeam(team);
        alert("¡Equipo guardado localmente!");
      }
    } catch (error) {
      console.error("Error al guardar el equipo:", error);
      alert("No se pudo guardar el equipo. Por favor, inténtalo de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  const handleResetTeam = () => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres reiniciar tu equipo? Esta acción no se puede deshacer."
      )
    ) {
      setTeam(Array(6).fill(null));
    }
  };

  if (loading) {
    return <Loading message="Cargando tu equipo..." size="large" />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Mi Equipo
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Construye tu equipo perfecto de hasta 6 Pokémon
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleResetTeam}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
            >
              <FiRefreshCw />
              <span>Reiniciar</span>
            </button>
            <button
              onClick={handleSaveTeam}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg font-semibold transition-colors"
            >
              <FiSave />
              <span>{saving ? "Guardando..." : "Guardar Equipo"}</span>
            </button>
          </div>
        </div>
      </div>

      <TeamBuilder team={team} onUpdateTeam={handleUpdateTeam} />

      <TeamAnalyzer team={team} />
    </div>
  );
};

export default MyTeam;
