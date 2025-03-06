import List from '@mui/material/List/List'
import { TaskStatus } from 'common/enums'
import { PAGE_SIZE, useGetTasksQuery } from 'features/todolists/api/tasksApi'
import { Task } from './Task/Task'
import { TasksSkeleton } from '../../../skeletons/TasksSkeleton/TasksSkeleton'
import type { DomainTodolist } from '../../../../lib/types/types'
import { TasksPagination } from '../TasksPagination/TasksPagination'
import { useState } from 'react'

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const [page, setPage] = useState(1)

  const { data: tasks, isLoading } = useGetTasksQuery({
    todolistId: todolist.id,
    args: { page },
  })

  let filteredTasks = tasks?.items
  switch (todolist.filter) {
    case 'active':
      filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
      break
    case 'completed':
      filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
      break
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Tasks list is empty</p>
      ) : (
        <>
          <List>
            {filteredTasks?.map((task) => {
              return <Task key={task.id} task={task} todolist={todolist} />
            })}
          </List>
          <>
            {tasks?.totalCount && tasks?.totalCount > PAGE_SIZE && (
              <TasksPagination totalCount={tasks?.totalCount || 0} page={page} setPage={setPage} />
            )}
          </>
        </>
      )}
    </>
  )
}
