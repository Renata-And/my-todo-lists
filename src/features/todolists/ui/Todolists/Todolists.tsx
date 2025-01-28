import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import { Todolist } from './Todolist/Todolist'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { selectTodolists } from '../../model/todolistsSelectors'
import { useEffect } from 'react'
import { fetchTodolistsTC } from '../../model/todolists-reducer'

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todolists.map((tl) => {
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
