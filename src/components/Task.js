import React from 'react';
import '../css/Task.css'; // Import the CSS file

const Task = ({ task, onDelete, onCancel, onUpdate }) => {
  // Function to handle cancellation of task
  const handleCancel = () => {
    onCancel(task.id);
  };

  // Render Task component
  return (
    <div className="task">
      {/* Task details */}
      <h3 className="task-title">Task Title: {task.title}</h3>
      <p className="task-detail">Description: {task.description}</p>
      <p className="task-detail">Due Date: {task.dueDate}</p>
      <p className="task-detail">Priority: {task.priority}</p>
      <p className="task-detail">Status: {task.status}</p>

      {/* Display recurring information if task is recurring */}
      {task.recurring && (
        <p className="task-detail">Recurring: {task.recurringType === 'custom' ? `Custom (${task.recurringCustom})` : task.recurringType}</p>
      )}

      {/* Buttons */}
      <div className="task-buttons">
        {/* Button to delete task */}
        <button className="task-button delete" onClick={() => onDelete(task.id)}>Delete</button>
        
        {/* Button to update task */}
        <button className="task-button update" onClick={() => onUpdate(task)}>Update</button>
        
        {/* Button to cancel task, only visible if task status is not 'canceled' */}
        {task.status !== 'canceled' && <button className="task-button cancel" onClick={handleCancel}>Cancel</button>}
      </div>
    </div>
  );
};

export default Task;
