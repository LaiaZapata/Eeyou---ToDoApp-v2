/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import TaskList from '../src/assets/components/TaskList';
import TaskForm from '../src/assets/components/TaskForm';
import TaskFilters from '../src/assets/components/TaskFilters';
import './App.css';

function App() {

  //Declaracion de estados
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('');
  

  //llamado de la lista de todas las tareas 
  useEffect(() => {
    getTasks();
  }, []);

  //consulta de tareas

  const getTasks = async () => {
    try {
      const response = await fetch("http://localhost:3001/GetTask");
      if (!response.ok) {
        throw new Error('Network response was not ok :/');
      }
      const data = await response.json();
      setTasks(data);
      setFilteredTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  //Agregar tareas nuevass

  const addTask = async (task) => {
    try {
      const response = await fetch("http://localhost:3001/createTask", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await response.json();
      getTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (task) => {
    try {
      const response = await fetch(`http://localhost:3001/UpdateTask/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await response.json();
      getTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3001/DeleteTask/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await response.json();
      getTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  //actualizar estados de los filtros

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    filterTasks(value, filterState);
  };

  //actualizar estados de los filtros
  const handleFilterChange = (value) => {
    setFilterState(value);
    filterTasks(searchTerm, value);
  };
  
  //actualizar estados de los filtros

  const filterTasks = (searchTerm, filterState) => {
    const filtered = tasks.filter((task) => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterState ? task.state === filterState : true)
    );
    setFilteredTasks(filtered);
  };

  const getWeekTasks = () => {
    // Filtrar las tareas de la semana actual

    const today = new Date();
    const first = today.getDate() - today.getDay();
    const last = first + 6;
    const filtered = tasks.filter((task) => {
      const taskDate = new Date(task.date);
      return taskDate.getDate() >= first && taskDate.getDate() <= last;
    });
    setFilteredTasks(filtered);
  };

  const getAllTasks = () => {
    setFilteredTasks(tasks);
  };

  return (
    <div className='container'>
      <div className='tasks'>
        <h1>Eeyou - task manager</h1>
        <TaskFilters
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onWeekTasksClick={getWeekTasks}
          onAllTasksClick={getAllTasks}
        />
        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onUpdate={updateTask}
        />
      </div>
      <div className='details'>
        <br />
        <TaskForm onAdd={addTask} />
      </div>
    </div>
  );
}

export default App;
