import { titleContainer, todolistTitle } from './TodolistTitle.styles'
import Typography from '@mui/material/Typography/Typography'
import { EditableSpan } from 'common/components'
import IconButton from '@mui/material/IconButton/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box/Box'
import { changeTodolistTitleTC, deleteTodolistTC } from '../../../../model/todolists-reducer'
import { useAppDispatch } from 'common/hooks'
import type { DomainTodolist } from '../../../../api/todolistsApi.types'

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTodoListHandler = () => {
    dispatch(deleteTodolistTC({ id: todolist.id }))
  }
  const changeTodoListTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleTC({ id: todolist.id, title }))
  }

  return (
    <Box sx={titleContainer}>
      <Typography variant={'h5'} component={'h2'} sx={todolistTitle}>
        <EditableSpan
          value={todolist.title}
          onChange={changeTodoListTitleHandler}
          disabled={todolist.status === 'loading'}
        />
      </Typography>
      <IconButton onClick={deleteTodoListHandler} size={'small'} disabled={todolist.status === 'loading'}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}
