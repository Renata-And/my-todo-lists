import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox/Checkbox'
import IconButton from '@mui/material/IconButton/IconButton'
import ListItem from '@mui/material/ListItem/ListItem'
import { EditableSpan } from 'common/components'
import { TaskStatus } from 'common/enums'
import { useDeleteTaskMutation, useUpdateTaskMutation } from 'features/todolists/api/tasksApi'
import { ChangeEvent } from 'react'
import { getListItemSx } from './Task.styles'
import type { DomainTask, DomainTodolist, UpdateTaskModel } from '../../../../../lib/types/types'

type Props = {
  todolist: DomainTodolist
  task: DomainTask
}

export const Task = ({ todolist, task }: Props) => {
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
      todolistId: todolist.id,
      taskId: task.id,
      model: createUpdateModel({ status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New }),
    })
  }

  const changeTaskTitle = (title: string) => {
    updateTask({ todolistId: todolist.id, taskId: task.id, model: createUpdateModel({ title }) })
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatus} size={'small'} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTaskHandler} size={'small'}>
        <DeleteIcon fontSize={'inherit'} />
      </IconButton>
    </ListItem>
  )
}
