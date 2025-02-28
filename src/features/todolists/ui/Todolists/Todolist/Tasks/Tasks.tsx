import List from '@mui/material/List/List'
import { TaskStatus } from 'common/enums'
import { useGetTasksQuery } from 'features/todolists/api/tasksApi'
import type { DomainTodolist } from '../../../../api/todolistsApi.types'
import { Task } from './Task/Task'

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const { data: tasks } = useGetTasksQuery({ todolistId: todolist.id })

  let filteredTasks = tasks?.items
  switch (todolist.filter) {
    case 'active':
      filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
      break
    case 'completed':
      filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
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
