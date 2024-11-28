import {filterButtonsContainerSx} from './FilterTasksButtons.styles'
import Button from '@mui/material/Button/Button';
import Box from '@mui/material/Box/Box';
import {changeTodolistFilterAC, FilterValuesType, TodolistType} from '../../../../model/todolists-reducer';
import {useAppDispatch} from '../../../../../../common/hooks/useAppDispatch';

type Props = {
  todolist: TodolistType
}

export const FilterTasksButtons = ({todolist}: Props) => {
  const dispatch = useAppDispatch()
  const changeTodolistFilter = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC({filter, id: todolist.id}))
  }
  const allFilterHandler = () => changeTodolistFilter('all');
  const activeFilterHandler = () => changeTodolistFilter('active');
  const completedFilterHandler = () => changeTodolistFilter('completed');

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={todolist.filter === 'all' ? 'contained' : 'outlined'}
        onClick={allFilterHandler}
        size={'small'}>
        All
      </Button>
      <Button
        variant={todolist.filter === 'active' ? 'contained' : 'outlined'}
        onClick={activeFilterHandler}
        size={'small'}>
        Active
      </Button>
      <Button
        variant={todolist.filter === 'completed' ? 'contained' : 'outlined'}
        onClick={completedFilterHandler}
        size={'small'}>
        Completed
      </Button>
    </Box>
  )
}