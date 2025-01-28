import { tasksReducer, type TasksType } from '../tasks-reducer'
import { addTodolistAC, todolistsReducer } from '../todolists-reducer'
import type { DomainTodolist } from '../../api/todolistsApi.types'
import { v1 } from 'uuid'

test('ids should be equals', () => {
  const startTasksState: TasksType = {}
  const startTodolistsState: DomainTodolist[] = []

  const action = addTodolistAC({
    todolist: {
      id: v1(),
      title: 'new todolist',
      order: 0,
      addedDate: '',
    },
  })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
