import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import type { TodolistType } from "../../../model/todolists-reducer"
import { AddItemForm } from "common/components"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { addTaskAC } from "../../../model/tasks-reducer"
import { useAppDispatch } from "common/hooks"

type Props = {
  todolist: TodolistType
}

export const Todolist = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const addTask = (taskTitle: string) => {
    dispatch(addTaskAC({ taskTitle, todolistId: todolist.id }))
  }

  return (
    <>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </>
  )
}
