export default function FormStep2({ formData, setFormData, onNext, onPrev }) {
  const regionesDisponibles = [
    "Kanto",
    "Johto",
    "Hoenn",
    "Sinnoh",
    "Teselia",
    "Kalos",
    "Alola",
    "Galar",
  ];

  const tiposFavoritos = [
    "Fuego",
    "Agua",
    "Planta",
    "Eléctrico",
    "Psíquico",
    "Dragón",
    "Fantasma",
    "Siniestro",
    "Acero",
    "Hada",
    "Lucha",
    "Volador",
    "Veneno",
    "Tierra",
    "Roca",
    "Bicho",
    "Hielo",
    "Normal",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.regionFavorita && formData.tipoFavorito) {
      onNext();
    } else {
      alert("Por favor completa tus preferencias Pokémon");
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
        ⚡ Preferencias de Entrenador
      </h3>

      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="regionFavorita"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "600",
          }}
        >
          Región Favorita <span style={{ color: "red" }}>*</span>
        </label>
        <select
          id="regionFavorita"
          name="regionFavorita"
          value={formData.regionFavorita || ""}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "2px solid #e0e0e0",
            borderRadius: "5px",
            fontSize: "1rem",
            background: "#fff",
          }}
        >
          <option value="">Selecciona tu región favorita</option>
          {regionesDisponibles.map((region, index) => (
            <option key={index} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="tipoFavorito"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "600",
          }}
        >
          Tipo de Pokémon Favorito <span style={{ color: "red" }}>*</span>
        </label>
        <select
          id="tipoFavorito"
          name="tipoFavorito"
          value={formData.tipoFavorito || ""}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "2px solid #e0e0e0",
            borderRadius: "5px",
            fontSize: "1rem",
            background: "#fff",
          }}
        >
          <option value="">Selecciona tu tipo favorito</option>
          {tiposFavoritos.map((tipo, index) => (
            <option key={index} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label
          htmlFor="pokemonFavorito"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "600",
          }}
        >
          Pokémon Favorito (opcional)
        </label>
        <input
          type="text"
          id="pokemonFavorito"
          name="pokemonFavorito"
          value={formData.pokemonFavorito || ""}
          onChange={handleChange}
          placeholder="Ej: Pikachu, Charizard, Mewtwo..."
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
          htmlFor="objetivo"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "600",
          }}
        >
          ¿Cuál es tu objetivo como entrenador? (opcional)
        </label>
        <textarea
          id="objetivo"
          name="objetivo"
          value={formData.objetivo || ""}
          onChange={handleChange}
          placeholder="Ej: Completar la Pokédex, ser Maestro Pokémon, coleccionar shinies..."
          rows="4"
          style={{
            width: "100%",
            padding: "0.75rem",
            border: "2px solid #e0e0e0",
            borderRadius: "5px",
            fontSize: "1rem",
            resize: "vertical",
          }}
        />
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
          type="submit"
          style={{
            flex: 1,
            padding: "0.75rem",
            background: "#ffcb05",
            color: "#333",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Siguiente →
        </button>
      </div>
    </form>
  );
}
