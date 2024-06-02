import React from 'react';
import Task from './Task'; // Import the Task component
import '../css/TodoList.css'; // Import the CSS file for TodoList

const TodoList = ({ tasks, onDelete, onCancel, onUpdate }) => {
  return (
    <div className="todo-list-container"> {/* Container for the TodoList */}
      {/* Header Bar */}
      <div className="header-bar"> {/* Header bar for the TodoList */}
        <h2 className="todo-list-header">Todo List</h2> {/* Header for the TodoList */}
      </div>
      
      {/* Task List */}
      {tasks && tasks.length > 0 ? ( // Check if tasks exist and are not empty
        tasks.map(task => ( // Loop through each task
          <Task key={task.id} task={task} onDelete={onDelete} onCancel={onCancel} onUpdate={onUpdate} /> // Render Task component for each task
        ))
      ) : (
        <p>No tasks available</p> // Render a message if no tasks are available
      )}
    </div>
  );
};

export default TodoList;