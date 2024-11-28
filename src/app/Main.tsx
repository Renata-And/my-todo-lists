import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm';
import {addTodolistAC} from '../features/todolists/model/todolists-reducer';
import {Todolists} from '../features/todolists/ui/Todolists/Todolists';
import {useAppDispatch} from '../common/hooks/useAppDispatch';

export const Main = () => {
  const dispatch = useAppDispatch()

  const addTodoList = (title: string) => {
    dispatch(addTodolistAC(title))
  }

  return (
    <Container>
      <Grid container sx={{ mb: '20px' }}>
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={3}>
        <Todolists/>
      </Grid>
    </Container>
  )
}