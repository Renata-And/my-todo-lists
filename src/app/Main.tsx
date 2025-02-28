import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import { AddItemForm } from 'common/components'
import { Todolists } from '../features/todolists/ui/Todolists/Todolists'
import { useAddTodolistMutation } from '../features/todolists/api/todolistsApi'

export const Main = () => {
  const [addTodoList] = useAddTodolistMutation()

  return (
    <Container>
      <Grid container sx={{ mb: '20px' }}>
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={3}>
        <Todolists />
      </Grid>
    </Container>
  )
}
