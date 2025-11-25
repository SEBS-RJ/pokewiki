export default function RegionItem({ nombre, generaciones }) {
  return (
    <li
      style={{
        background: "#fff",
        padding: "0.5rem",
        marginBottom: "0.5rem",
        borderRadius: "5px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }}
    >
      <strong>{nombre}</strong> — Generación(es): {generaciones}
    </li>
  );
}
