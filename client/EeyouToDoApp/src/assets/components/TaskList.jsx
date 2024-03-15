/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onUpdate }) {
  return (
    <div className='task-list'>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={() => onDelete(task.id)} onUpdate={onUpdate} />
      ))}
    </div>
  );
}

export default TaskList;

