import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import { Todolist } from './Todolist/Todolist'
import { useGetTodolistsQuery } from '../../api/todolistsApi'
import { TodolistSkeleton } from '../skeletons/TodolistSkeleton/TodolistSkeleton'

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '32px' }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </div>
    )
  }

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
