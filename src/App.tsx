import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './components/Todolist';
import { v1 } from 'uuid';

const todolist1_id = v1();
const todolist2_id = v1();

const defaultTasks: TasksType = {
  [todolist1_id]: [
    { id: v1(), title: 'Milk', isDone: true },
    { id: v1(), title: 'Bread', isDone: true },
    { id: v1(), title: 'Eggs', isDone: false }
  ],
  [todolist2_id]: [
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false }
  ],
}

const defaultTodolists: TodolistsType[] = [
  {
    id: todolist1_id,
    title: 'What to buy',
    filter: 'all'
  },
  {
    id: todolist2_id,
    title: 'What to learn',
    filter: 'all'
  }
]

type TodolistsType = {
  id: string
  title: string
  filter: FilterValueType
}

type TasksType = {
  [key: string]: TaskType[]
}

export type FilterValueType = 'all' | 'active' | 'complited'

function App() {
  const [todolists, setTodolists] = useState<TodolistsType[]>(defaultTodolists)
  const [tasks, setTasks] = useState<TasksType>(defaultTasks)

  //Tasks

  const deleteTask = (preload: { id: string, todolistId: string }) => {
    const { id, todolistId } = preload;
    const newTasksState = tasks[todolistId].filter(task => task.id !== id);
    setTasks({ ...tasks, [todolistId]: newTasksState });
  }

  const addTask = (preload: { taskTitle: string, todolistId: string }) => {
    const { taskTitle, todolistId } = preload;
    const newTask = { id: v1(), title: taskTitle, isDone: false };
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
  }

  const setTaskNewStatus = (preload: { taskId: string, newStatus: boolean, todolistId: string }) => {
    const { newStatus, taskId, todolistId } = preload;
    const newTasksState: TaskType[] = tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone: newStatus } : task);
    setTasks({ ...tasks, [todolistId]: newTasksState });
  }

  // Lists
  const changeFilter = (preload: { filter: FilterValueType, todolistId: string }) => {
    const { filter, todolistId } = preload;
    setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, filter } : tl))
  }

  const deleteTodolist = (id: string) => {
    setTodolists(todolists.filter(tl => tl.id !== id))
    delete tasks[id]
  }

  return (
    <div className='App'>
      {todolists.map(tl => {
        let filteredTasks = tasks[tl.id];
        switch (tl.filter) {
          case 'active':
            filteredTasks = tasks[tl.id].filter(task => !task.isDone)
            break;
          case 'complited':
            filteredTasks = tasks[tl.id].filter(tasks => tasks.isDone)
            break;
        }
        return (
          <Todolist
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={filteredTasks}
            deleteTask={deleteTask}
            addTask={addTask}
            setTaskNewStatus={setTaskNewStatus}
            changeFilter={changeFilter}
            deleteTodolist={deleteTodolist}
            filter={tl.filter}
          />
        )
      })}
    </div>
  );
}

export default App;
