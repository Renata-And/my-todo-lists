import { AddItemForm } from 'common/components'
import { useAddTaskMutation } from 'features/todolists/api/tasksApi'
import type { DomainTodolist } from '../../../api/todolistsApi.types'
import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons'
import { Tasks } from './Tasks/Tasks'
import { TodolistTitle } from './TodolistTitle/TodolistTitle'

type Props = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: Props) => {
  const [addTask] = useAddTaskMutation()

  const addTaskHandler = (taskTitle: string) => {
    addTask({ title: taskTitle, todolistId: todolist.id })
  }

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} disabled={todolist.status === 'loading'} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </>
  )
}
