import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

export const todolist1_id = v1();
export const todolist2_id = v1();

const initialState: TodolistType[] = [
  {
    id: todolist1_id,
    title: 'What to buy',
    filter: 'all'
  },
  {
    id: todolist2_id,
    title: 'What to learn',
    filter: 'all'
  }
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'DELETE_TODOLIST': {
      const { id } = action.payload;
      return state.filter(tl => tl.id !== id)
    }
    case 'ADD_TODOLIST': {
      const { title, todolistId } = action.payload;
      return [{ id: todolistId, title: title, filter: 'all' }, ...state]
    }
    case 'UPDATE_TODOLIST_TITLE': {
      const { id, title } = action.payload;
      return state.map(tl => tl.id === id ? { ...tl, title: title } : tl)
    }
    case 'CHANGE_TODOLIST_FILTER': {
      const { id, filter } = action.payload;
      return state.map(tl => tl.id === id ? { ...tl, filter: filter } : tl)
    }
    default:
      return state;
  }
}

// Action creators
export const deleteTodolistAC = (id: string) => {
  return { type: 'DELETE_TODOLIST', payload: { id } } as const
}
export const addTodolistAC = (title: string) => {
  return { type: 'ADD_TODOLIST', payload: { title, todolistId: v1() } } as const
}
export const updateTodolistTitleAC = (payload: { id: string, title: string }) => {
  return { type: 'UPDATE_TODOLIST_TITLE', payload } as const
}
export const changeTodolistFilterAC = (payload: { filter: FilterValuesType, id: string }) => {
  return { type: 'CHANGE_TODOLIST_FILTER', payload } as const
}

// Actions types
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type UpdateTodolistTitleActionType = ReturnType<typeof updateTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType = DeleteTodolistActionType | AddTodolistActionType | UpdateTodolistTitleActionType | ChangeTodolistFilterActionType