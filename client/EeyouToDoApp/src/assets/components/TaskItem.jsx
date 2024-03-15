/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function TaskItem({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className='task'>
      <h2>{task.title}</h2>
      <p>Titulo: {task.title}</p>
      <p>Descripcion: {task.description}</p>
      <p>Fecha: {task.date}</p>
      <p>Estado: {task.state}</p>
      <p>Categoria: {task.category}</p>
      {isEditing ? (
        <>
          <div className='ed'>
          <input type="text" name="title" value={editedTask.title} onChange={handleChange} />
          <input type="text" name="description" value={editedTask.description} onChange={handleChange} />
          <input type="date" name="date" value={editedTask.date} onChange={handleChange} />
          <input type="text" name="category" value={editedTask.category} onChange={handleChange} />
          <select name="state" value={editedTask.state} onChange={handleChange}>
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En Progreso</option>
            <option value="completada">Completada</option>
          </select>
          <button onClick={handleSave}>Guardar</button>
          </div>
        </>
      ) : (
        <>
          <button onClick={handleEdit}>Editar</button>
          <button onClick={() => onDelete(task.id)}>Eliminar</button>
        </>
      )}
    </div>
  );
}

export default TaskItem;