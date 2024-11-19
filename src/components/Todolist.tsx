import {ChangeEvent} from 'react';
import {FilterValueType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';

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
    updateTodoListTitle: (preload: { todoListId: string, title: string }) => void
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
        : <List>
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
                    <ListItem
                        key={task.id}
                        sx={{justifyContent: 'space-between', opacity: task.isDone ? 0.5 : 1}}
                        disablePadding
                        disableGutters>
                        <div>
                            <Checkbox checked={task.isDone} onChange={taskStatusHandler} size={'small'}/>
                            <EditableSpan value={task.title} updateTitle={updateTaskCallback}/>
                        </div>
                        <IconButton onClick={deleteTaskHandler} size={'small'}>
                            <DeleteIcon fontSize={'inherit'}/>
                        </IconButton>
                    </ListItem>
                )
            })}
        </List>

    return (
        <div className="todolist">
            <div className="titleContainer">
                <h2>
                    <EditableSpan value={props.title} updateTitle={updateTitle}/>
                </h2>
                <IconButton onClick={deleteTodoListHandler} size={'small'}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskCallback}/>
            {tasksList}
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={allFilterHandler}
                        size={'small'}>
                    All
                </Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'text'} onClick={activeFilterHandler}
                        size={'small'}>
                    Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'text'} onClick={completedFilterHandler}
                        size={'small'}>
                    Completed
                </Button>
            </Box>
        </div>
    )
}