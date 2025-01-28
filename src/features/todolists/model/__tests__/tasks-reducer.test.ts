import { addTaskAC, deleteTaskAC, tasksReducer, type TasksType, updateTaskAC } from '../tasks-reducer'
import { addTodolistAC, deleteTodolistAC } from '../todolists-reducer'
import { TaskPriority, TaskStatus } from 'common/enums'
import { v1 } from 'uuid'

let startState: TasksType

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        deadline: '',
        order: 0,
        description: '',
        priority: TaskPriority.Middle,
        startDate: '',
        status: TaskStatus.New,
        todoListId: 'todolistId1',
        addedDate: '',
      },
      {
        id: '2',
        title: 'JS',
        deadline: '',
        order: 0,
        description: '',
        priority: TaskPriority.Middle,
        startDate: '',
        status: TaskStatus.Completed,
        todoListId: 'todolistId1',
        addedDate: '',
      },
      {
        id: '3',
        title: 'React',
        deadline: '',
        order: 0,
        description: '',
        priority: TaskPriority.Middle,
        startDate: '',
        status: TaskStatus.New,
        todoListId: 'todolistId1',
        addedDate: '',
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        deadline: '',
        order: 0,
        description: '',
        priority: TaskPriority.Middle,
        startDate: '',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        addedDate: '',
      },
      {
        id: '2',
        title: 'milk',
        deadline: '',
        order: 0,
        description: '',
        priority: TaskPriority.Middle,
        startDate: '',
        status: TaskStatus.Completed,
        todoListId: 'todolistId2',
        addedDate: '',
      },
      {
        id: '3',
        title: 'tea',
        deadline: '',
        order: 0,
        description: '',
        priority: TaskPriority.Middle,
        startDate: '',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        addedDate: '',
      },
    ],
  }
})

test('correct task should be deleted from correct array', () => {
  const endState = tasksReducer(startState, deleteTaskAC({ todolistId: 'todolistId2', id: '2' }))

  expect(endState).toEqual({
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        deadline: '',
        order: 0,
        description: '',
        priority: TaskPriority.Middle,
        startDate: '',
        status: TaskStatus.New,
        todoListId: 'todolistId1',
        addedDate: '',
      },
      {
        id: '2',
        title: 'JS',
        deadline: '',
        order: 0,
        description: '',
        priority: TaskPriority.Middle,
        startDate: '',
        status: TaskStatus.Completed,
        todoListId: 'todolistId1',
        addedDate: '',
      },
      {
        id: '3',
        title: 'React',
        deadline: '',
        order: 0,
        description: '',
        priority: TaskPriority.Middle,
        startDate: '',
        status: TaskStatus.New,
        todoListId: 'todolistId1',
        addedDate: '',
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        deadline: '',
        order: 0,
        description: '',
        priority: TaskPriority.Middle,
        startDate: '',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        addedDate: '',
      },
      {
        id: '3',
        title: 'tea',
        deadline: '',
        order: 0,
        description: '',
        priority: TaskPriority.Middle,
        startDate: '',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        addedDate: '',
      },
    ],
  })
})

test('correct task should be added to correct array', () => {
  const endState = tasksReducer(
    startState,
    addTaskAC({
      task: {
        id: v1(),
        title: 'juice',
        addedDate: '',
        order: 0,
        description: '',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        startDate: '',
        priority: TaskPriority.Middle,
        deadline: '',
      },
    }),
  )

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juice')
  expect(endState['todolistId2'][0].status).toBeFalsy()
})

test('status of specified task should be changed', () => {
  const endState = tasksReducer(
    startState,
    updateTaskAC({
      task: {
        id: '2',
        title: 'milk',
        deadline: '',
        order: 0,
        description: '',
        priority: TaskPriority.Middle,
        startDate: '',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        addedDate: '',
      },
    }),
  )

  expect(endState['todolistId1'][1].status).toBeTruthy()
  expect(endState['todolistId2'][1].status).toBeFalsy()
})

test('title of specified task should be changed', () => {
  const endState = tasksReducer(
    startState,
    updateTaskAC({
      task: {
        id: '2',
        title: 'New Task Title',
        deadline: '',
        order: 0,
        description: '',
        priority: TaskPriority.Middle,
        startDate: '',
        status: TaskStatus.New,
        todoListId: 'todolistId2',
        addedDate: '',
      },
    }),
  )

  expect(endState['todolistId1'][1].title).not.toBe('New Task Title')
  expect(endState['todolistId2'][1].title).toBe('New Task Title')
})

test('new array should be added when new todolist is added', () => {
  const endState = tasksReducer(
    startState,
    addTodolistAC({ todolist: { title: 'new todolist', id: v1(), order: 0, addedDate: '' } }),
  )
  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== 'todolistId1' && k !== 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const action = deleteTodolistAC({ id: 'todolistId2' })
  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).toBeUndefined()
})
