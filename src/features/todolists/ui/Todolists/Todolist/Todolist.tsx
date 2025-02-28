import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons'
import { AddItemForm } from 'common/components'
import { Tasks } from './Tasks/Tasks'
import { TodolistTitle } from './TodolistTitle/TodolistTitle'
import { addTaskTC } from '../../../model/tasksSlice'
import { useAppDispatch } from 'common/hooks'
import type { DomainTodolist } from '../../../api/todolistsApi.types'

type Props = {
  todolist: DomainTodolist
}

export const Todolist = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const addTaskHandler = (taskTitle: string) => {
    dispatch(addTaskTC({ title: taskTitle, todolistId: todolist.id }))
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
