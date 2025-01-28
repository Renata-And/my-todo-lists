import type { RootState } from '../../../app/store'
import type { DomainTodolist } from '../api/todolistsApi.types'

export const selectTodolists = (state: RootState): DomainTodolist[] => state.todolists
