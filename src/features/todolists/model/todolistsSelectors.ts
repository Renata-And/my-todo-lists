import type {RootState} from '../../../app/store';
import type {TodolistType} from './todolists-reducer';

export const selectTodolists = (state: RootState): TodolistType[] => state.todolists