import ListItem from '@mui/material/ListItem/ListItem'
import { getListItemSx } from './Task.styles'
import Checkbox from '@mui/material/Checkbox/Checkbox'
import { EditableSpan } from 'common/components'
import IconButton from '@mui/material/IconButton/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { ChangeEvent } from 'react'
import { deleteTaskTC, updateTaskTC } from '../../../../../model/tasks-reducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import type { DomainTodolist } from '../../../../../api/todolistsApi.types'
import { TaskStatus } from 'common/enums'
import type { DomainTask, UpdateTaskDomainModel } from '../../../../../api/tasksApi.types'

type Props = {
  todolist: DomainTodolist
  task: DomainTask
}

export const Task = ({ todolist, task }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTask = () => {
    dispatch(deleteTaskTC({ taskId: task.id, todolistId: todolist.id }))
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const model: UpdateTaskDomainModel = {
      status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
    }
    dispatch(updateTaskTC({ task, model }))
  }

  const changeTaskTitle = (title: string) => {
    const model: UpdateTaskDomainModel = {
      title,
    }
    dispatch(updateTaskTC({ task, model }))
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatus}
          size={'small'}
          disabled={todolist.status === 'loading'}
        />
        <EditableSpan value={task.title} onChange={changeTaskTitle} disabled={todolist.status === 'loading'} />
      </div>
      <IconButton onClick={deleteTask} size={'small'} disabled={todolist.status === 'loading'}>
        <DeleteIcon fontSize={'inherit'} />
      </IconButton>
    </ListItem>
  )
}
