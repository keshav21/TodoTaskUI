
import React, { useState } from 'react';
import '../css/UpdateTodoForm.css'; // Import the CSS file

const UpdateTodoForm = ({ showUpdateModal, task, onSubmit }) => {
  // State variables for form inputs and modal display
  const [showModal, setShowModal] = useState(showUpdateModal);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);
  const [recurring, setRecurring] = useState(task.recurring);
  const [recurringType, setRecurringType] = useState(task.recurringType);
  const [recurringCustom, setRecurringCustom] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data
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

  // Render UpdateTodoForm component
  return (
    <div>
      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            {/* Close button */}
            <span className="close-modal-btn" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Update A Task</h2>
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
              <button type="submit">Update Task</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateTodoForm;