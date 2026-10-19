import Button from "./Button";
import TaskItem from "./TaskItem";

const TaskList = ({ tareas, onCompletar, onEliminar, onEditar, guardando, filtro, onCambiarFiltro, busqueda, onCambiarBusqueda }) => {
  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "5px" }}>
          <Button label="Todas" onClick={() => onCambiarFiltro("todas")} variant={filtro === "todas" ? "primary" : "secondary"} />
          <Button label="Pendientes" onClick={() => onCambiarFiltro("pendientes")} variant={filtro === "pendientes" ? "primary" : "secondary"} />
          <Button label="Completadas" onClick={() => onCambiarFiltro("completadas")} variant={filtro === "completadas" ? "primary" : "secondary"} />
        </div>
        <input 
          type="text" 
          placeholder="Buscar tarea..." 
          className="task-input" 
          value={busqueda} 
          onChange={(e) => onCambiarBusqueda(e.target.value)} 
          style={{ flex: 1 }} 
        />
      </div>

      {tareas.length === 0 ? (
        <p style={{ textAlign: "center", color: "#94a3b8" }}>No se encontraron tareas con estos filtros.</p>
      ) : (
        <ul className="task-list">
          {tareas.map((tarea) => (
            <TaskItem 
              key={tarea.id} 
              tarea={tarea} 
              onCompletar={onCompletar} 
              onEliminar={onEliminar} 
              onEditar={onEditar} 
              guardando={guardando} 
            />
          ))}
        </ul>
      )}
    </div>
  );
};
export default TaskList;