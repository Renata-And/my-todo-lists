import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  deleteTaskAC,
  tasksReducer,
  type TasksType,
} from "../tasks-reducer"
import { addTodolistAC, deleteTodolistAC } from "../todolists-reducer"

let startState: TasksType

beforeEach(() => {
  startState = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  }
})

test("correct task should be deleted from correct array", () => {
  const endState = tasksReducer(startState, deleteTaskAC({ todolistId: "todolistId2", id: "2" }))

  expect(endState).toEqual({
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "3", title: "tea", isDone: false },
    ],
  })
})

test("correct task should be added to correct array", () => {
  const endState = tasksReducer(startState, addTaskAC({ taskTitle: "juice", todolistId: "todolistId2" }))

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("juice")
  expect(endState["todolistId2"][0].isDone).toBeFalsy()
})

test("status of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    changeTaskStatusAC({
      taskId: "2",
      isDone: false,
      todolistId: "todolistId2",
    }),
  )

  expect(endState["todolistId1"][1].isDone).toBe(true)
  expect(endState["todolistId2"][1].isDone).toBe(false)
})

test("title of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    changeTaskTitleAC({
      taskId: "2",
      title: "New Task Title",
      todolistId: "todolistId2",
    }),
  )

  expect(endState["todolistId1"][1].title).not.toBe("New Task Title")
  expect(endState["todolistId2"][1].title).toBe("New Task Title")
})

test("new array should be added when new todolist is added", () => {
  const endState = tasksReducer(startState, addTodolistAC("new todolist"))
  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const action = deleteTodolistAC("todolistId2")
  const endState = tasksReducer(startState, action)
  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).toBeUndefined()
})
