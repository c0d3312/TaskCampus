import Button from "./Button";

const Navigation = ({ vistaActiva, setVistaActiva }) => {
  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
      <Button label="Resumen" onClick={() => setVistaActiva('resumen')} variant={vistaActiva === 'resumen' ? "primary" : "secondary"} />
      <Button label="Lista de Tareas" onClick={() => setVistaActiva('tareas')} variant={vistaActiva === 'tareas' ? "primary" : "secondary"} />
      <Button label="Nueva Tarea" onClick={() => setVistaActiva('nueva')} variant={vistaActiva === 'nueva' ? "primary" : "secondary"} />
    </div>
  );
};
export default Navigation;