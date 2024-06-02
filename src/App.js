import React, { useState,useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import UpdateTodoForm from './components/UpdateTodoForm';
import './App.css';
import TodoApiClient from './client/TodoClient';


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTobeUpdated, setTaskTobeUpdated] = useState();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const username = 'admin';
  const password = 'password';
  const todoClient = new TodoApiClient(username, password);

  const getTasks = async () => {
    try {
      let newTasks = {};
      await todoClient.fetchData()
      .then(data => 
         newTasks = data.map(d=> ({
          id: d.id,
          title: d.title,
          description: d.description,
          dueDate: d.dueDate,
          priority: d.priority,
          status: d.status,
          canceled: d.canceled,
          recurring: d.recurring,
          recurringType: d.recurringType,
        }))
      )
      .catch(error => console.error('Error fetching tasks:', error));
      return newTasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };



  useEffect(() => {
    async function fetchData() {
       const newTasks = await getTasks();
       setTasks(newTasks);
    }
    fetchData();
  }, []);

  const addTask = async (task) => {
    if (task.recurring) {
      let recurrenceDates = [];
      switch (task.recurringType) {
        case 'daily':
          recurrenceDates = generateDailyRecurrence(task);
          break;
        case 'weekly':
          recurrenceDates = generateWeeklyRecurrence(task);
          break;
        case 'custom':
          recurrenceDates = generateCustomRecurrence(task, task.recurringCustom);
          break;
        default:
          break;
      }
      const newTasks = recurrenceDates.map(date => ({
        ...task,
        id: Date.now() + Math.random(), // Generate unique ID
        dueDate: date
      }));
      newTasks.forEach( task => {
        let createdTask = task;
        async function createATask() {
          createdTask = await createTasks(task);
        }
        createATask();
        task.id = createdTask.id;
      });
      if(task.length>0){
        setTasks(...task,...newTasks);
      }else {
        setTasks(newTasks);
      }
    } else {
      await createTasks(task);
      const fetchNewTasks = await getTasks();
      setTasks(fetchNewTasks);
    }

  };


  const createTasks = async (task) => {
    let createTasksData = {}
    try {
      const newTaskData = {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        status: task.priority,
        canceled: task.canceled,
        recurring: task.recurring,
        recurringType: task.recurringType,
      };
      await todoClient.createTask(newTaskData)
      .then(data => { createTasksData=data})
      .catch(error => console.error('Error creating task:', error));
      return createTasksData;
    } catch (error) {
      console.error('Error Creating a task:', error);
    }
  };


  const onUpdate = async (task) => {
    setTaskTobeUpdated(task);
    setShowUpdateModal(true);
  }


  const updateTask = async (task) => {
    try {
      const newTask = {
        id: task.id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        status: task.status,
        canceled: task.canceled,
        recurring: task.recurring,
        recurringType: task.recurringType,
      };
      await todoClient.updateTask(newTask)
      .then(data => console.log('Task updated:', data))
      .catch(error => console.error('Error updating task:', error));
      setShowUpdateModal(false);
      setTasks([]);
      const newTasks = await getTasks();
      setTasks(newTasks);
    } catch (error) {
      console.error('Error Updating task:', error);
    }
  };


  const deleteATask = async (id) => {
    try {
      await todoClient.deleteTask(id)
      .then(data => console.log('Task deleted:', data))
      .catch(error => console.error('Error deleting task:', error));
      const newTasks = await getTasks();
      setTasks(newTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const cancelATask = async (id) => {
    try {
      await todoClient.cancelTask(id)
      .then(data => console.log('Task canceled:', data))
      .catch(error => console.error('Error canceling task:', error));
      const newTasks = await getTasks();
      setTasks(newTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const deleteTask = (id) => {
    deleteATask(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const cancelTask = async (id) => {
      cancelATask(id);
      setTasks(tasks.map(task => task.id === id ? { ...task, status: 'canceled' } : task));
  };
  
  const generateDailyRecurrence = (task) => {
    const today = new Date();
    const recurrenceDates = [];
    for (let i = 0; i < 5; i++) {
      const newDate = new Date(today);
      newDate.setDate(newDate.getDate() + i);
      recurrenceDates.push(newDate.toISOString().split('T')[0]); // Format date as "YYYY-MM-DD"
    }
    return recurrenceDates;
  };

  const generateWeeklyRecurrence = (task) => {
    const today = new Date();
    const recurrenceDates = [];
    for (let i = 0; i < 5; i++) {
      const newDate = new Date(today);
      newDate.setDate(newDate.getDate() + i * 7);
      recurrenceDates.push(newDate.toISOString().split('T')[0]); // Format date as "YYYY-MM-DD"
    }
    return recurrenceDates;
  };

  const generateCustomRecurrence = (task, customRecurrence) => {
    const today = new Date();
    const recurrenceDates = [];
    for (let i = 0; i < 5; i++) {
      const newDate = new Date(today);
      newDate.setDate(newDate.getDate() + i);
      recurrenceDates.push(newDate.toISOString().split('T')[0]); // Format date as "YYYY-MM-DD"
    }
    return recurrenceDates;
  };

  return (
    <div className="container">
      <div className="top-bar">A Todo Task Handler</div>
      <TodoForm onSubmit={addTask} />
      { showUpdateModal  &&  <UpdateTodoForm  task={taskTobeUpdated} showUpdateModal={showUpdateModal} onSubmit={updateTask} /> }
      <TodoList tasks={tasks} onDelete={deleteTask} onCancel={cancelTask} onUpdate={onUpdate}/>
    </div>
  );
};

export default App; 