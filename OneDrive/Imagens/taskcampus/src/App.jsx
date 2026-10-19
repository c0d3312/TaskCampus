import { useState, useEffect } from "react";
import useTareas from "./hooks/useTareas";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Card from "./components/Card";
import TaskList from "./components/TaskList";
import TaskSummary from "./components/TaskSummary";
import TaskForm from "./components/TaskForm";
import Modal from "./components/Modal";
import "./App.css";

const App = () => {
  const { tareas, cargando, guardando, error, crearTarea, actualizarTarea, eliminarTarea, editarTitulo } = useTareas();
  
  const [vistaActiva, setVistaActiva] = useState("tareas");
  const [tareaAEliminar, setTareaAEliminar] = useState(null);
  const [filtro, setFiltro] = useState("todas");
  const [busqueda, setBusqueda] = useState("");

  // Prevención de errores: Aseguramos que siempre haya un string antes de usar toLowerCase()
  const tareasFiltradas = tareas.filter((t) => {
    const coincideFiltro = filtro === "todas" ? true : filtro === "completadas" ? t.completada : !t.completada;
    const tituloSeguro = t.titulo || ""; 
    const coincideBusqueda = tituloSeguro.toLowerCase().includes(busqueda.toLowerCase());
    return coincideFiltro && coincideBusqueda;
  });

  useEffect(() => {
    const pendientes = tareas.filter((t) => !t.completada).length;
    document.title = `TaskCampus (${pendientes} pendientes)`;
  }, [tareas]);

  const handleConfirmarEliminacion = () => {
    eliminarTarea(tareaAEliminar);
    setTareaAEliminar(null);
  };

  return (
    <div className="app-container">
      <Header title="TaskCampus" description="Gestor de tareas académicas" />
      <Navigation vistaActiva={vistaActiva} setVistaActiva={setVistaActiva} />

      {cargando && <p className="estado-carga">⏳ Cargando datos iniciales...</p>}
      {error && <p className="estado-error">⚠️ {error}</p>}

      {!cargando && !error && (
        <>
          {vistaActiva === "resumen" && (
            <Card titulo="Resumen de Tareas">
              <TaskSummary 
                tareas={tareas} 
                mostrando={tareasFiltradas.length} 
                filtroActual={filtro} 
              />
            </Card>
          )}

          {vistaActiva === "tareas" && (
            <Card titulo="Lista de Tareas">
              <TaskList 
                tareas={tareasFiltradas} 
                filtro={filtro}
                onCambiarFiltro={setFiltro}
                busqueda={busqueda}
                onCambiarBusqueda={setBusqueda}
                onCompletar={(id, completada) => actualizarTarea(id, { completada })} 
                onEliminar={setTareaAEliminar} 
                onEditar={editarTitulo}
                guardando={guardando} 
              />
            </Card>
          )}

          {vistaActiva === "nueva" && (
            <Card titulo="Crear Nueva Tarea">
              <TaskForm onAgregar={crearTarea} guardando={guardando} onSuccess={() => setVistaActiva("tareas")} />
            </Card>
          )}
        </>
      )}

      <Modal
        visible={tareaAEliminar !== null}
        mensaje="¿Seguro que deseas eliminar esta tarea permanentemente?"
        onConfirmar={handleConfirmarEliminacion}
        onCancelar={() => setTareaAEliminar(null)}
      />
    </div>
  );
};

export default App;