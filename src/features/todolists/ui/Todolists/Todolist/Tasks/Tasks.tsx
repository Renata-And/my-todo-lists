import List from '@mui/material/List/List'
import { Task } from './Task/Task'
import { useAppSelector } from 'common/hooks/useAppSelector'
import type { DomainTodolist } from '../../../../api/todolistsApi.types'
import { TaskStatus } from 'common/enums'
import { useEffect } from 'react'
import { useAppDispatch } from 'common/hooks'
import { fetchTasksTC, selectTasks } from '../../../../model/tasksSlice'

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC({ todolistId: todolist.id }))
  }, [])

  let filteredTasks = tasks[todolist.id]
  switch (todolist.filter) {
    case 'active':
      filteredTasks = tasks[todolist.id].filter((task) => task.status === TaskStatus.New)
      break
    case 'completed':
      filteredTasks = tasks[todolist.id].filter((task) => task.status === TaskStatus.Completed)
      break
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Tasks list is empty</p>
      ) : (
        <List>
          {filteredTasks?.map((task) => {
            return <Task key={task.id} task={task} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}
