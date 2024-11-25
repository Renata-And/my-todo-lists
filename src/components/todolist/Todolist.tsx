import { ChangeEvent } from 'react';
import { FilterValuesType } from '../../App';
import { AddItemForm } from '../AddItemForm';
import { EditableSpan } from '../EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button/Button';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import List from '@mui/material/List/List';
import ListItem from '@mui/material/ListItem/ListItem';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import { filterButtonsContainerSx, getListItemSx, titleContainer, todolistTitle } from './Todolist.styles';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistType = {
  todolistId: string
  title: string
  tasks: TaskType[]
  deleteTask: (payload: { id: string, todolistId: string }) => void
  addTask: (payload: { taskTitle: string, todolistId: string }) => void
  changeTaskStatus: (payload: { taskId: string, isDone: boolean, todolistId: string }) => void
  changeTaskTitle: (payload: { taskId: string, title: string, todolistId: string }) => void
  changeTodolistFilter: (payload: { filter: FilterValuesType; id: string }) => void
  deleteTodoList: (id: string) => void
  changeTodoListTitle: (payload: { id: string, title: string }) => void
  filter: FilterValuesType
}

export function Todolist(props: TodolistType) {
  const allFilterHandler = () => props.changeTodolistFilter({ filter: 'all', id: props.todolistId });
  const activeFilterHandler = () => props.changeTodolistFilter({ filter: 'active', id: props.todolistId });
  const completedFilterHandler = () => props.changeTodolistFilter({ filter: 'completed', id: props.todolistId });
  const updateTitle = (title: string) => props.changeTodoListTitle({ id: props.todolistId, title })

  const deleteTodoListHandler = () => props.deleteTodoList(props.todolistId)
  const addTaskCallback = (title: string) => props.addTask({ taskTitle: title, todolistId: props.todolistId })

  const tasksList = props.tasks.length === 0
    ? <p>Tasks list is empty</p>
    : <List>
      {props.tasks.map(task => {
        const deleteTaskHandler = () => props.deleteTask({ id: task.id, todolistId: props.todolistId });
        const taskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus({
          taskId: task.id,
          isDone: e.currentTarget.checked,
          todolistId: props.todolistId
        });
        const updateTaskCallback = (title: string) => {
          props.changeTaskTitle({ taskId: task.id, todolistId: props.todolistId, title })
        }
        return (
          <ListItem
            key={task.id}
            sx={getListItemSx(task.isDone)}
          >
            <div>
              <Checkbox checked={task.isDone} onChange={taskStatusHandler} size={'small'} />
              <EditableSpan value={task.title} updateTitle={updateTaskCallback} />
            </div>
            <IconButton onClick={deleteTaskHandler} size={'small'}>
              <DeleteIcon fontSize={'inherit'} />
            </IconButton>
          </ListItem>
        )
      })}
    </List>

  return (
    <div>
      <Box sx={titleContainer}>
        <Typography variant={'h5'} component={'h2'} sx={todolistTitle}>
          <EditableSpan value={props.title} updateTitle={updateTitle} />
        </Typography>
        <IconButton onClick={deleteTodoListHandler} size={'small'}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <AddItemForm addItem={addTaskCallback} />
      {tasksList}
      <Box sx={filterButtonsContainerSx}>
        <Button sx={{ fontWeight: '600' }} variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={allFilterHandler}
          size={'small'}>
          All
        </Button>
        <Button sx={{ fontWeight: '600' }} variant={props.filter === 'active' ? 'outlined' : 'text'} onClick={activeFilterHandler}
          size={'small'}>
          Active
        </Button>
        <Button sx={{ fontWeight: '600' }} variant={props.filter === 'completed' ? 'outlined' : 'text'} onClick={completedFilterHandler}
          size={'small'}>
          Completed
        </Button>
      </Box>
    </div >
  )
}