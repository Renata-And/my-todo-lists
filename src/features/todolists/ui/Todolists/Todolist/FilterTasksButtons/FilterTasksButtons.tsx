import { filterButtonsContainerSx } from './FilterTasksButtons.styles'
import Button from '@mui/material/Button/Button'
import Box from '@mui/material/Box/Box'
import { FilterValuesType } from '../../../../model/todolistsSlice'
import { useAppDispatch } from 'common/hooks'
import { DomainTodolist } from 'features/todolists/api/todolistsApi.types'
import { todolistsApi } from '../../../../api/todolistsApi'

type Props = {
  todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()
  const changeTodolistFilterHandler = (filter: FilterValuesType) => {
    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
        const index = state.findIndex((tl) => tl.id === todolist.id)
        if (index !== -1) {
          state[index].filter = filter
        }
      }),
    )
  }
  const allFilterHandler = () => changeTodolistFilterHandler('all')
  const activeFilterHandler = () => changeTodolistFilterHandler('active')
  const completedFilterHandler = () => changeTodolistFilterHandler('completed')

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
