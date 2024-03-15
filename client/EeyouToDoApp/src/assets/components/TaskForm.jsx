/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState('pendiente');
  const [category, setCategory] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const task = { title, date, description, state, category };
    onAdd(task);
    setTitle('');
    setDate('');
    setDescription('');
    setState('pendiente');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar nueva tarea</h2>
      <label>
        Título:
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Descripción:
        <input
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Fecha:
        <input
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <label>
        Estado:
        <select value={state} onChange={(e) => setState(e.target.value)} required>
          <option value='pendiente'>Pendiente</option>
          <option value='en progreso'>En Progreso</option>
          <option value='completada'>Completada</option>
        </select>
      </label>
      <label>
        categoria:
        <input
          type='text'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </label>
      <button type='submit'>Agregar</button>
    </form>
  );
}

export default TaskForm;
