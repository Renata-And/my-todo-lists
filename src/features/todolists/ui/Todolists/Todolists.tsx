import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import { Todolist } from './Todolist/Todolist'
import { useGetTodolistsQuery } from '../../api/todolistsApi'

export const Todolists = () => {
  const { data: todolists } = useGetTodolistsQuery()

  return (
    <>
      {todolists?.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper elevation={6} sx={{ p: '0 15px 15px 15px' }}>
              <Todolist todolist={tl} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
