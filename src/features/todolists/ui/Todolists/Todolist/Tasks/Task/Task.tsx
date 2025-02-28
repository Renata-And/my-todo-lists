import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox/Checkbox'
import IconButton from '@mui/material/IconButton/IconButton'
import ListItem from '@mui/material/ListItem/ListItem'
import { EditableSpan } from 'common/components'
import { TaskStatus } from 'common/enums'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useDeleteTaskMutation, useUpdateTaskMutation } from 'features/todolists/api/tasksApi'
import { ChangeEvent } from 'react'
import type { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from '../../../../../api/tasksApi.types'
import type { DomainTodolist } from '../../../../../api/todolistsApi.types'
import { updateTaskTC } from '../../../../../model/tasksSlice'
import { getListItemSx } from './Task.styles'

type Props = {
  todolist: DomainTodolist
  task: DomainTask
}

export const Task = ({ todolist, task }: Props) => {
  const dispatch = useAppDispatch()
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const deleteTaskHandler = () => {
    deleteTask({ taskId: task.id, todolistId: todolist.id })
  }

  const createUpdateModel = (updates: Partial<UpdateTaskModel>): UpdateTaskModel => ({
    status: task.status,
    title: task.title,
    startDate: task.startDate,
    priority: task.priority,
    description: task.description,
    deadline: task.deadline,
    ...updates,
  })

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    updateTask({
      task,
      model: createUpdateModel({ status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New }),
    })
  }

  const changeTaskTitle = (title: string) => {
    updateTask({ task, model: createUpdateModel({ title }) })
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
      <IconButton onClick={deleteTaskHandler} size={'small'} disabled={todolist.status === 'loading'}>
        <DeleteIcon fontSize={'inherit'} />
      </IconButton>
    </ListItem>
  )
}
