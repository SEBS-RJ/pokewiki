export default function FormStep1({ formData, setFormData, onNext }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nombreEntrenador && formData.apodo && formData.correo) {
      onNext();
    } else {
      alert("Por favor completa todos los campos obligatorios");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ color: "#3b4cca", marginBottom: "1.5rem" }}>
        👤 Registro de Entrenador Pokémon
      </h3>

      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="nombreEntrenador"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "600",
          }}
        >
          Nombre del Entrenador <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          id="nombreEntrenador"
          name="nombreEntrenador"
          value={formData.nombreEntrenador || ""}
          onChange={handleChange}
          placeholder="Ej: Ash, Misty, Brock..."
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "2px solid #e0e0e0",
            borderRadius: "5px",
            fontSize: "1rem",
          }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="apodo"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "600",
          }}
        >
          Apodo de Entrenador <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          id="apodo"
          name="apodo"
          value={formData.apodo || ""}
          onChange={handleChange}
          placeholder="Tu nickname en el mundo Pokémon"
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "2px solid #e0e0e0",
            borderRadius: "5px",
            fontSize: "1rem",
          }}
        />
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label
          htmlFor="correo"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "600",
          }}
        >
          Correo Electrónico <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="email"
          id="correo"
          name="correo"
          value={formData.correo || ""}
          onChange={handleChange}
          placeholder="entrenador@pokedex.com"
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "2px solid #e0e0e0",
            borderRadius: "5px",
            fontSize: "1rem",
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "0.75rem",
          background: "#ffcb05",
          color: "#333",
          border: "none",
          borderRadius: "5px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.background = "#3b4cca")}
        onMouseOut={(e) => (e.target.style.background = "#ffcb05")}
      >
        Siguiente →
      </button>
    </form>
  );
}
