import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('TodoList', () => {
  const mockTasks = [
    { id: 1, title: 'Task 1', description: 'Description 1', dueDate: '2024-06-04', priority: 'high', status: 'incomplete' },
    { id: 2, title: 'Task 2', description: 'Description 2', dueDate: '2024-06-05', priority: 'medium', status: 'complete' }
  ];

  const mockOnDelete = jest.fn();
  const mockOnCancel = jest.fn();
  const mockOnUpdate = jest.fn();

  test('renders TodoList component with tasks', () => {
    render(<TodoList tasks={mockTasks} onDelete={mockOnDelete} onCancel={mockOnCancel} onUpdate={mockOnUpdate} />);
    
    const header = screen.getByText('Todo List');
    expect(header).toBeInTheDocument();

    const task1 = screen.getByText('Task Title: Task 1');
    expect(task1).toBeInTheDocument();

    const task2 = screen.getByText('Task Title: Task 2');
    expect(task2).toBeInTheDocument();

    expect(screen.queryByText('No tasks available')).not.toBeInTheDocument();
  });

  test('renders TodoList component with no tasks', () => {
    render(<TodoList tasks={[]} onDelete={mockOnDelete} onCancel={mockOnCancel} onUpdate={mockOnUpdate} />);
    
    const noTasksMessage = screen.getByText('No tasks available');
    expect(noTasksMessage).toBeInTheDocument();
  });

});
