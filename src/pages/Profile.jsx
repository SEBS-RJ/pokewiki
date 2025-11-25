import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import UserProfile from "../components/profile/UserProfile";
import UserStats from "../components/profile/UserStats";
import AchievementBadges from "../components/profile/AchievementBadges";

const Profile = () => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600 dark:text-gray-400">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Mi Perfil
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Consulta tus estadísticas, logros y progreso
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <UserProfile />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <UserStats />
          <AchievementBadges />
        </div>
      </div>
    </div>
  );
};

export default Profile;
