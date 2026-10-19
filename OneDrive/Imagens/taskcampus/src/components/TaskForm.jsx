import { useState } from "react";
import Button from "./Button";

const TaskForm = ({ onAgregar, guardando, onSuccess }) => {
  const [titulo, setTitulo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (titulo.trim().length === 0) {
      setError("El título no puede estar vacío.");
      return;
    }
    const exito = await onAgregar(titulo.trim());
    if (exito) {
      setTitulo("");
      setError("");
      if(onSuccess) onSuccess(); // Vuelve a la lista tras crear
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="task-form">
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ej: Estudiar para prueba" className="task-input" disabled={guardando} />
        <Button type="submit" label={guardando ? "Agregando..." : "Agregar"} variant="primary" disabled={guardando} />
      </form>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};
export default TaskForm;