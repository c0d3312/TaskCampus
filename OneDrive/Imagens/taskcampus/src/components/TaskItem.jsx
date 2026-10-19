import { useState } from "react";
import Button from "./Button";
import Badge from "./Badge";

const TaskItem = ({ tarea, onCompletar, onEliminar, onEditar, guardando }) => {
  const [editando, setEditando] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState(tarea.titulo);

  const handleGuardar = () => {
    if (nuevoTitulo.trim() !== "" && nuevoTitulo !== tarea.titulo) {
      onEditar(tarea.id, nuevoTitulo.trim());
    }
    setEditando(false);
  };

  return (
    <li className="task-item">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }} onClick={() => setEditando(true)}>
        <Badge texto={tarea.completada ? "completada" : "pendiente"} />
        {editando ? (
          <input
            type="text" autoFocus className="task-input" value={nuevoTitulo}
            onChange={(e) => setNuevoTitulo(e.target.value)}
            onBlur={handleGuardar}
            onKeyDown={(e) => e.key === 'Enter' && handleGuardar()}
          />
        ) : (
          <span style={{ textDecoration: tarea.completada ? "line-through" : "none", color: tarea.completada ? "#94a3b8" : "inherit", cursor: "pointer" }}>
            {tarea.titulo}
          </span>
        )}
      </div>
      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <Button label={tarea.completada ? "Desmarcar" : "Completar"} onClick={(e) => { e.stopPropagation(); onCompletar(tarea.id, !tarea.completada); }} variant={tarea.completada ? "success" : "primary"} disabled={guardando} />
        <Button label="Eliminar" onClick={(e) => { e.stopPropagation(); onEliminar(tarea.id); }} variant="danger" disabled={guardando} />
      </div>
    </li>
  );
};
export default TaskItem;