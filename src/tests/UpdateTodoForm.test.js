import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UpdateTodoForm from '../components/UpdateTodoForm';

describe('UpdateTodoForm', () => {
  const mockTask = {
    title: 'Test Task',
    description: 'Test Description',
    dueDate: '2024-06-04',
    priority: 'high',
    status: 'incomplete',
    recurring: true,
    recurringType: 'weekly',
    recurringCustom: 'Custom Recurrence'
  };

  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(<UpdateTodoForm showUpdateModal={true} task={mockTask} onSubmit={mockOnSubmit} />);
  });

  test('renders Update Todo Form', () => {
    const formTitle = screen.getByText('Update A Task');
    expect(formTitle).toBeInTheDocument();
  });

  test('updates state and calls onSubmit', () => {
    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'Updated Task' } });
    const descriptionInput = screen.getByPlaceholderText('Description');
    fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });
    const dueDateInput = screen.getByPlaceholderText('Due Date');
    fireEvent.change(dueDateInput, { target: { value: '2024-06-05' } });
    const prioritySelect = screen.getByDisplayValue('High');
    fireEvent.change(prioritySelect, { target: { value: 'medium' } });
    const statusSelect = screen.getByDisplayValue('Incomplete');
    fireEvent.change(statusSelect, { target: { value: 'complete' } });
    const recurringCheckbox = screen.getByLabelText('Recurring Task:');
    fireEvent.click(recurringCheckbox);
    const submitButton = screen.getByText('Update Task');
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Updated Task',
      description: 'Updated Description',
      dueDate: '2024-06-05',
      priority: 'medium',
      status: 'complete',
      recurring: false,
      recurringType: 'weekly',
      recurringCustom: ''
    });
  });
});
