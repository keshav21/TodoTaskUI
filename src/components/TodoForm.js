import React, { useState } from 'react';
import '../css/TodoForm.css'; // Import the CSS file for styling

const TodoForm = ({ onSubmit }) => {
  // State variables for form inputs and modal display
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [recurringType, setRecurringType] = useState('');
  const [recurringCustom, setRecurringCustom] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data through onSubmit prop
    onSubmit({ title, description, dueDate, priority, status, recurring, recurringType, recurringCustom });
    // Reset form inputs and hide modal
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('');
    setStatus('');
    setRecurring(false);
    setRecurringType('');
    setRecurringCustom('');
    setShowModal(false);
  };

  // Render the TodoForm component
  return (
    <div>
      {/* Button to open modal */}
      <button className="open-modal-btn" onClick={() => setShowModal(true)}>Add Task</button>
      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            {/* Close button */}
            <span className="close-modal-btn" onClick={() => setShowModal(false)}>&times;</span>
            {/* Modal title */}
            <h2>Add Task</h2>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Title input */}
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
              {/* Description input */}
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
              {/* Due Date input */}
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="Due Date" />
              {/* Priority select */}
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {/* Status select */}
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select Status</option>
                <option value="complete">Complete</option>
                <option value="incomplete">Incomplete</option>
              </select>
              {/* Recurring checkbox */}
              <label>
                Recurring Task:
                <input type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} />
              </label>
              {/* Conditional rendering of recurring options */}
              {recurring && (
                <>
                  {/* Recurring Type select */}
                  <select value={recurringType} onChange={(e) => setRecurringType(e.target.value)}>
                    <option value="">Select Recurring Type</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="custom">Custom</option>
                  </select>
                  {/* Custom Recurrence input */}
                  {recurringType === 'custom' && (
                    <input type="text" value={recurringCustom} onChange={(e) => setRecurringCustom(e.target.value)} placeholder="Custom Recurrence" />
                  )}
                </>
              )}
              {/* Submit button */}
              <button type="submit">Add A Task</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoForm;
