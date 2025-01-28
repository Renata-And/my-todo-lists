import { filterButtonsContainerSx } from './FilterTasksButtons.styles'
import Button from '@mui/material/Button/Button'
import Box from '@mui/material/Box/Box'
import { changeTodolistFilterAC, FilterValuesType } from '../../../../model/todolists-reducer'
import { useAppDispatch } from 'common/hooks'
import { DomainTodolist } from 'features/todolists/api/todolistsApi.types'

type Props = {
  todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()
  const changeTodolistFilter = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC({ filter, id: todolist.id }))
  }
  const allFilterHandler = () => changeTodolistFilter('all')
  const activeFilterHandler = () => changeTodolistFilter('active')
  const completedFilterHandler = () => changeTodolistFilter('completed')

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        color={todolist.filter === 'all' ? 'secondary' : 'primary'}
        variant={'contained'}
        onClick={allFilterHandler}
        size={'small'}
      >
        All
      </Button>
      <Button
        color={todolist.filter === 'active' ? 'secondary' : 'primary'}
        variant={'contained'}
        onClick={activeFilterHandler}
        size={'small'}
      >
        Active
      </Button>
      <Button
        color={todolist.filter === 'completed' ? 'secondary' : 'primary'}
        variant={'contained'}
        onClick={completedFilterHandler}
        size={'small'}
      >
        Completed
      </Button>
    </Box>
  )
}
