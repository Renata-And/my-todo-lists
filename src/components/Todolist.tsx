import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValueType } from '../App'
import { Button } from './Button'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistType = {
  todolistId: string
  title: string
  tasks: TaskType[]
  deleteTask: (preload: { id: string, todolistId: string }) => void
  addTask: (preload: { taskTitle: string, todolistId: string }) => void
  setTaskNewStatus: (preload: { taskId: string, newStatus: boolean, todolistId: string }) => void
  changeFilter: (preload: { filter: FilterValueType, todolistId: string }) => void
  deleteTodolist: (id: string) => void
  filter: FilterValueType
}

export function Todolist(props: TodolistType) {
  const [taskTitle, setTaskTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const addTaskHandler = () => {
    taskTitle.trim() !== ''
      ? props.addTask({ taskTitle: taskTitle.trim(), todolistId: props.todolistId })
      : setErrorMessage('Title is required');
    setTaskTitle('');
  }
  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    setTaskTitle(e.currentTarget.value);
  }
  const keyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => isTitleLengthValid && e.key === 'Enter' && addTaskHandler();
  const allFilterHandler = () => props.changeFilter({ filter: 'all', todolistId: props.todolistId });
  const activeFilterHandler = () => props.changeFilter({ filter: 'active', todolistId: props.todolistId });
  const completedFilterHandler = () => props.changeFilter({ filter: 'complited', todolistId: props.todolistId });
  const deleteTodolistHandler = () => props.deleteTodolist(props.todolistId)

  let isTitleLengthValid = taskTitle.length < 15;

  const tasksList: JSX.Element = props.tasks.length === 0
    ? <p>Tasks list is empty</p>
    : <ul>
      {props.tasks.map(task => {
        const deleteTaskHandler = () => props.deleteTask({ id: task.id, todolistId: props.todolistId });
        const taskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.setTaskNewStatus({ taskId: task.id, newStatus: e.currentTarget.checked, todolistId: props.todolistId });
        return (
          <li key={task.id} className={task.isDone ? 'done-task' : ''}>
            <input type='checkbox' checked={task.isDone} onChange={taskStatusHandler} />{task.title}
            <Button title='x' onClick={deleteTaskHandler} />
          </li>
        )
      })}
    </ul>

  return (
    <div className='todolist'>
      <div className='titleContainer'>
        <h2>{props.title}</h2>
        <Button title='x' onClick={deleteTodolistHandler} />
      </div>

      <input className={errorMessage ? 'error' : ''} type='text' placeholder='Max 15 characters' value={taskTitle} onChange={changeInputHandler} onKeyUp={keyUpHandler} />
      <Button title='+' onClick={addTaskHandler} disabled={!isTitleLengthValid} />
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
      {!isTitleLengthValid && <div className='error-message'>Max 15 characters</div>}
      {tasksList}

      <Button
        title='All'
        className={props.filter === 'all' ? 'active-btn' : ''}
        onClick={allFilterHandler} />
      <Button
        title='Active'
        className={props.filter === 'active' ? 'active-btn' : ''}
        onClick={activeFilterHandler} />
      <Button
        title='Completed'
        className={props.filter === 'complited' ? 'active-btn' : ''}
        onClick={completedFilterHandler} />
    </div>
  )
}