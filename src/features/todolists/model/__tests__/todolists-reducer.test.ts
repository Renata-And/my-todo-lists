import {
  addTodolistAC,
  changeTodolistFilterAC,
  deleteTodolistAC,
  todolistsReducer,
  changeTodolistTitleAC,
  type TodolistType,
  type FilterValuesType,
} from "../todolists-reducer"
import { v1 } from "uuid"

let todolistId1: string
let todolistId2: string
let startState: TodolistType[]

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]
})

test("correct todolist should be deleted", () => {
  const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  const title = "New todolist"
  const endState = todolistsReducer(startState, addTodolistAC(title))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(title)
})

test("correct todolist should change its name", () => {
  const title = "New title"
  const endState = todolistsReducer(startState, changeTodolistTitleAC({ id: todolistId2, title }))

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(title)
})

test("correct filter of todolist should be changed", () => {
  const filter: FilterValuesType = "completed"
  const endState = todolistsReducer(startState, changeTodolistFilterAC({ id: todolistId2, filter }))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(filter)
})
