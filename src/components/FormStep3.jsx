export default function FormStep3({ formData, onPrev, onConfirm }) {
  const handleConfirm = () => {
    console.log("🎮 Datos del nuevo entrenador:", formData);
    alert(
      `¡Bienvenido a la Pokédex, ${formData.apodo}! Tu registro ha sido completado.`
    );
    onConfirm();
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ color: "#3b4cca", marginBottom: "1.5rem" }}>
        ✅ Confirmación de Registro
      </h3>

      <div
        style={{
          background: "#f6f6f6",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "1.5rem",
        }}
      >
        <h4
          style={{
            marginTop: 0,
            color: "#333",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          👤 Datos del Entrenador
        </h4>
        <p style={{ margin: "0.5rem 0" }}>
          <strong>Nombre:</strong> {formData.nombreEntrenador}
        </p>
        <p style={{ margin: "0.5rem 0" }}>
          <strong>Apodo:</strong> {formData.apodo}
        </p>
        <p style={{ margin: "0.5rem 0" }}>
          <strong>Correo:</strong> {formData.correo}
        </p>

        <h4
          style={{
            marginTop: "1.5rem",
            color: "#333",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          ⚡ Preferencias Pokémon
        </h4>
        <p style={{ margin: "0.5rem 0" }}>
          <strong>Región Favorita:</strong> {formData.regionFavorita}
        </p>
        <p style={{ margin: "0.5rem 0" }}>
          <strong>Tipo Favorito:</strong> {formData.tipoFavorito}
        </p>
        {formData.pokemonFavorito && (
          <p style={{ margin: "0.5rem 0" }}>
            <strong>Pokémon Favorito:</strong> {formData.pokemonFavorito}
          </p>
        )}
        {formData.objetivo && (
          <p style={{ margin: "0.5rem 0" }}>
            <strong>Objetivo:</strong> {formData.objetivo}
          </p>
        )}
      </div>

      <div
        style={{
          background: "#fff3cd",
          padding: "1rem",
          borderRadius: "5px",
          marginBottom: "1.5rem",
          border: "1px solid #ffcb05",
        }}
      >
        <p style={{ margin: 0, color: "#856404" }}>
          ⚠️ Verifica que todos los datos sean correctos. Una vez confirmado,
          serás registrado oficialmente como entrenador en nuestra Pokédex.
        </p>
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          type="button"
          onClick={onPrev}
          style={{
            flex: 1,
            padding: "0.75rem",
            background: "#e0e0e0",
            color: "#333",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ← Anterior
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          style={{
            flex: 1,
            padding: "0.75rem",
            background: "#3b4cca",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Confirmar Registro ✓
        </button>
      </div>
    </div>
  );
}
