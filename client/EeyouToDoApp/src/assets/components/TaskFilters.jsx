/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function TaskFilters({ onSearchChange, onFilterChange, onWeekTasksClick, onAllTasksClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearchChange(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterState(event.target.value);
    onFilterChange(event.target.value);
  };

  return (
    <div className='filters'>
      <input
        type='text'
        placeholder='Buscar tarea...'
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select value={filterState} onChange={handleFilterChange}>
        <option value=''>Todos</option>
        <option value='pendiente'>Pendiente</option>
        <option value='en progreso'>En Progreso</option>
        <option value='completada'>Completada</option>
      </select>
      <br></br>
      <p></p>
      <button onClick={onWeekTasksClick}>Ver tareas próximas a vencer</button>
      <button onClick={onAllTasksClick}>Ver todas las tareas</button>
      <br></br>
      <p></p>
      <p></p>
      <br></br>
    </div>
   
  );
}

export default TaskFilters;
