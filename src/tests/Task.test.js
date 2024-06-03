import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Task from '../components/Task';

describe('Task', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    dueDate: '2024-06-04',
    priority: 'high',
    status: 'incomplete',
    recurring: true,
    recurringType: 'weekly',
    recurringCustom: 'Custom Recurrence'
  };

  const mockOnDelete = jest.fn();
  const mockOnCancel = jest.fn();
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    render(<Task task={mockTask} onDelete={mockOnDelete} onCancel={mockOnCancel} onUpdate={mockOnUpdate} />);
  });

  test('renders Task component with task details', () => {
    const titleElement = screen.getByText('Task Title: Test Task');
    expect(titleElement).toBeInTheDocument();

    const descriptionElement = screen.getByText('Description: Test Description');
    expect(descriptionElement).toBeInTheDocument();

    const dueDateElement = screen.getByText('Due Date: 2024-06-04');
    expect(dueDateElement).toBeInTheDocument();

    const priorityElement = screen.getByText('Priority: high');
    expect(priorityElement).toBeInTheDocument();

    const statusElement = screen.getByText('Status: incomplete');
    expect(statusElement).toBeInTheDocument();

    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toBeInTheDocument();

    const updateButton = screen.getByText('Update');
    expect(updateButton).toBeInTheDocument();

    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton).toBeInTheDocument();
  });

  test('calls onDelete function when delete button is clicked', () => {
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  test('calls onUpdate function when update button is clicked', () => {
    const updateButton = screen.getByText('Update');
    fireEvent.click(updateButton);
    expect(mockOnUpdate).toHaveBeenCalledWith(mockTask);
  });

  test('calls onCancel function when cancel button is clicked', () => {
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalledWith(1);
  });
});
