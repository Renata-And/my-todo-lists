import {
  addTodolistAC,
  changeTodolistFilterAC,
  deleteTodolistAC,
  todolistsReducer,
  changeTodolistTitleAC,
  type FilterValuesType,
} from '../todolists-reducer'
import { v1 } from 'uuid'
import type { DomainTodolist } from '../../api/todolistsApi.types'

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[]

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    { id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
    { id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0 },
  ]
})

test('correct todolist should be deleted', () => {
  const endState = todolistsReducer(startState, deleteTodolistAC({ id: todolistId1 }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  const title = 'New todolist'
  const endState = todolistsReducer(
    startState,
    addTodolistAC({ todolist: { id: v1(), order: 0, title, addedDate: '' } }),
  )

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(title)
})

test('correct todolist should change its name', () => {
  const title = 'New title'
  const endState = todolistsReducer(startState, changeTodolistTitleAC({ id: todolistId2, title }))

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(title)
})

test('correct filter of todolist should be changed', () => {
  const filter: FilterValuesType = 'completed'
  const endState = todolistsReducer(startState, changeTodolistFilterAC({ id: todolistId2, filter }))

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(filter)
})
