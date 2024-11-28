import ListItem from '@mui/material/ListItem/ListItem';
import {getListItemSx} from './Task.styles';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import {EditableSpan} from '../../../../../../../common/components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {ChangeEvent} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, type TaskType} from '../../../../../model/tasks-reducer';
import type {TodolistType} from '../../../../../model/todolists-reducer';
import {useAppDispatch} from '../../../../../../../common/hooks/useAppDispatch';

type Props = {
  todolist: TodolistType
  task: TaskType
}

export const Task = ({todolist, task}: Props) => {
  const dispatch = useAppDispatch()

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC({isDone: e.currentTarget.checked, taskId: task.id, todolistId: todolist.id}))
  }
  const deleteTask = () => {
    dispatch(deleteTaskAC({id: task.id, todolistId: todolist.id}));
  }
  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleAC({taskId: task.id, title, todolistId: todolist.id}))
  }

  return (
    <ListItem
      key={task.id}
      sx={getListItemSx(task.isDone)}
    >
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatus} size={'small'}/>
        <EditableSpan value={task.title} updateTitle={changeTaskTitle}/>
      </div>
      <IconButton onClick={deleteTask} size={'small'}>
        <DeleteIcon fontSize={'inherit'}/>
      </IconButton>
    </ListItem>
  )
}