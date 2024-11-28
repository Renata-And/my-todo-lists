import { v1 } from 'uuid';
import { AddTodolistActionType, DeleteTodolistActionType } from './todolists-reducer';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksType = {
  [key: string]: TaskType[]
}

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
  switch (action.type) {
    case 'DELETE_TASK': {
      const { id, todolistId } = action.payload;
      const newTasksState = state[todolistId].filter(t => t.id !== id);
      return { ...state, [todolistId]: newTasksState }
    }
    case 'ADD_TASK': {
      const { taskTitle, todolistId } = action.payload;
      return { ...state, [todolistId]: [{ id: v1(), title: taskTitle, isDone: false }, ...state[todolistId]] }
    }
    case 'CHANGE_TASK_STATUS': {
      const { isDone, taskId, todolistId } = action.payload;
      return { ...state, [todolistId]: state[todolistId].map(t => t.id === taskId ? { ...t, isDone: isDone } : t) }
    }
    case 'CHANGE_TASK_TITLE': {
      const { taskId, todolistId, title } = action.payload;
      return { ...state, [todolistId]: state[todolistId].map(t => t.id === taskId ? { ...t, title } : t) }
    }
    case 'ADD_TODOLIST': {
      const { todolistId } = action.payload;
      return { ...state, [todolistId]: [] }
    }
    case 'DELETE_TODOLIST': {
      const { id } = action.payload;
      const newState = { ...state }
      delete newState[id]
      return newState;
    }
    default:
      return state;
  }
}

// Action creators
export const deleteTaskAC = (payload: { id: string, todolistId: string }) => {
  return { type: 'DELETE_TASK', payload } as const
}
export const addTaskAC = (payload: { taskTitle: string, todolistId: string }) => {
  return { type: 'ADD_TASK', payload } as const
}
export const changeTaskStatusAC = (payload: { taskId: string, isDone: boolean, todolistId: string }) => {
  return { type: 'CHANGE_TASK_STATUS', payload } as const
}
export const changeTaskTitleAC = (payload: { taskId: string, title: string, todolistId: string }) => {
  return { type: 'CHANGE_TASK_TITLE', payload } as const
}

// Actions types
export type deleteTaskActionType = ReturnType<typeof deleteTaskAC>
export type addTaskActionType = ReturnType<typeof addTaskAC>
export type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = deleteTaskActionType | addTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType | AddTodolistActionType | DeleteTodolistActionType