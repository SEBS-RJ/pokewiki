export default function FormProgress({ currentStep, totalSteps, progress }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "1.5rem",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginBottom: "1.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h3 style={{ margin: 0, color: "#3b4cca" }}>
          Paso {currentStep} de {totalSteps}
        </h3>
        <span
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#ffcb05",
          }}
        >
          {progress}%
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: "12px",
          background: "#e0e0e0",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg, #ffcb05, #3b4cca)",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "0.5rem",
          fontSize: "0.85rem",
          color: "#666",
        }}
      >
        <span>Datos del entrenador</span>
        <span>Preferencias Pokémon</span>
        <span>Confirmación</span>
      </div>
    </div>
  );
}
