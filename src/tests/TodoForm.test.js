import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TodoForm from '../components/TodoForm';

describe('TodoForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(<TodoForm onSubmit={mockOnSubmit} />);
  });

  test('renders TodoForm component', () => {
    const addButton = screen.getByText('Add Task');
    expect(addButton).toBeInTheDocument();
  });

  test('opens modal on button click', () => {
    const addButton = screen.getByText('Add Task');
    fireEvent.click(addButton);
    const modal = screen.getByText('Add A Task');
    expect(modal).toBeInTheDocument();
  });

  test('submits form with correct data', () => {
    const addButton = screen.getByText('Add Task');
    fireEvent.click(addButton);

    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'Test Task' } });

    const descriptionInput = screen.getByPlaceholderText('Description');
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

    const dueDateInput = screen.getByPlaceholderText('Due Date');
    fireEvent.change(dueDateInput, { target: { value: '2024-06-04' } });

    const prioritySelect = screen.getByDisplayValue('Select Priority');
    fireEvent.change(prioritySelect, { target: { value: 'medium' } });

    const statusSelect = screen.getByDisplayValue('Select Status');
    fireEvent.change(statusSelect, { target: { value: 'incomplete' } });

    const recurringCheckbox = screen.getByLabelText('Recurring Task:');
    fireEvent.click(recurringCheckbox);

    const recurringTypeSelect = screen.getByDisplayValue('Select Recurring Type');
    fireEvent.change(recurringTypeSelect, { target: { value: 'weekly' } });

    const submitButton = screen.getByText('Add A Task');
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Test Task',
      description: 'Test Description',
      dueDate: '2024-06-04',
      priority: 'medium',
      status: 'incomplete',
      recurring: true,
      recurringType: 'weekly',
      recurringCustom: ''
    });
  });
});
