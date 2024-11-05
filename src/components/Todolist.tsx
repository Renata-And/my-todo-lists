import {ChangeEvent} from 'react'
import {FilterValueType} from '../App'
import {Button} from './Button'
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    todoListId: string
    title: string
    tasks: TaskType[]
    deleteTask: (preload: { id: string, todoListId: string }) => void
    addTask: (preload: { taskTitle: string, todoListId: string }) => void
    setTaskNewStatus: (preload: { taskId: string, newStatus: boolean, todoListId: string }) => void
    updateTask: (preload: { taskId: string, title: string, todoListId: string }) => void
    changeFilter: (preload: { filter: FilterValueType; todoListId: string }) => void
    deleteTodoList: (id: string) => void
    updateTodoListTitle: (preload: {todoListId: string, title: string}) => void
    filter: FilterValueType
}

export function Todolist(props: TodolistType) {
    const allFilterHandler = () => props.changeFilter({filter: 'all', todoListId: props.todoListId});
    const activeFilterHandler = () => props.changeFilter({filter: 'active', todoListId: props.todoListId});
    const completedFilterHandler = () => props.changeFilter({filter: 'completed', todoListId: props.todoListId});
    const updateTitle = (title: string) => props.updateTodoListTitle({todoListId: props.todoListId, title})

    const deleteTodoListHandler = () => props.deleteTodoList(props.todoListId)
    const addTaskCallback = (title: string) => props.addTask({taskTitle: title, todoListId: props.todoListId})

    const tasksList = props.tasks.length === 0
        ? <p>Tasks list is empty</p>
        : <ul>
            {props.tasks.map(task => {
                const deleteTaskHandler = () => props.deleteTask({id: task.id, todoListId: props.todoListId});
                const taskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.setTaskNewStatus({
                    taskId: task.id,
                    newStatus: e.currentTarget.checked,
                    todoListId: props.todoListId
                });
                const updateTaskCallback = (title: string) => {
                    props.updateTask({taskId: task.id, todoListId: props.todoListId, title})
                }
                return (
                    <li key={task.id} className={task.isDone ? 'done-task' : ''}>
                        <input type="checkbox" checked={task.isDone} onChange={taskStatusHandler}/>
                        <EditableSpan value={task.title} updateTitle={updateTaskCallback}/>
                        <Button title="x" onClick={deleteTaskHandler}/>
                    </li>
                )
            })}
        </ul>

    return (
        <div className="todolist">
            <div className="titleContainer">
                <h2>
                    <EditableSpan value={props.title} updateTitle={updateTitle}/>
                </h2>
                <Button title="x" onClick={deleteTodoListHandler}/>
            </div>
            <AddItemForm addItem={addTaskCallback}/>
            {tasksList}

            <Button
                title="All"
                className={props.filter === 'all' ? 'active-btn' : ''}
                onClick={allFilterHandler}/>
            <Button
                title="Active"
                className={props.filter === 'active' ? 'active-btn' : ''}
                onClick={activeFilterHandler}/>
            <Button
                title="Completed"
                className={props.filter === 'completed' ? 'active-btn' : ''}
                onClick={completedFilterHandler}/>
        </div>
    )
}