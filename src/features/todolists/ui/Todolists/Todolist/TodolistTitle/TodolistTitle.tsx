import { titleContainer, todolistTitle } from './TodolistTitle.styles'
import Typography from '@mui/material/Typography/Typography'
import { EditableSpan } from 'common/components'
import IconButton from '@mui/material/IconButton/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box/Box'
import { todolistsApi, useChangeTodolistTitleMutation, useDeleteTodolistMutation } from '../../../../api/todolistsApi'
import type { RequestStatus } from '../../../../../../app/appSlice'
import { useAppDispatch } from 'common/hooks'
import type { DomainTodolist } from '../../../../lib/types/types'

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()
  const [deleteTodolist] = useDeleteTodolistMutation()
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
        const index = state.findIndex((tl) => tl.id === todolist.id)
        if (index !== -1) {
          state[index].status = status
        }
      }),
    )
  }
  const deleteTodoListHandler = () => {
    updateQueryData('loading')
    deleteTodolist(todolist.id)
      .unwrap()
      .catch(() => {
        updateQueryData('idle')
      })
  }
  const changeTodoListTitleHandler = (title: string) => {
    changeTodolistTitle({ id: todolist.id, title })
  }

  return (
    <Box sx={titleContainer}>
      <Typography variant={'h5'} component={'h2'} sx={todolistTitle}>
        <EditableSpan value={todolist.title} onChange={changeTodoListTitleHandler} />
      </Typography>
      <IconButton onClick={deleteTodoListHandler} size={'small'}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}
