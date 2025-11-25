import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { usePokemonContext } from "../../context/PokemonContext";
import { FiMail, FiCalendar, FiAward } from "react-icons/fi";

const UserProfile = () => {
  const { user } = useAuthContext();
  const { getCapturedCount } = usePokemonContext();

  if (!user) return null;

  const userMetadata = user.user_metadata || {};
  const username = userMetadata.username || user.email.split("@")[0];

  const joinDate = new Date(user.created_at).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
          {username.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {username}
        </h2>
      </div>

      <div className="space-y-4">
        {/* EMAIL */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <FiMail className="text-blue-500" size={20} />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Correo</p>
            <p className="text-gray-900 dark:text-white font-medium">
              {user.email}
            </p>
          </div>
        </div>

        {/* FECHA DE REGISTRO */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <FiCalendar className="text-green-500" size={20} />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Miembro Desde
            </p>
            <p className="text-gray-900 dark:text-white font-medium">
              {joinDate}
            </p>
          </div>
        </div>

        {/* TOTAL CAPTURADOS */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <FiAward className="text-yellow-500" size={20} />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pokémon Capturados
            </p>
            <p className="text-gray-900 dark:text-white font-medium text-2xl">
              {getCapturedCount()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
