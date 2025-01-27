import { titleContainer, todolistTitle } from "./TodolistTitle.styles"
import Typography from "@mui/material/Typography/Typography"
import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import Box from "@mui/material/Box/Box"
import { changeTodolistTitleAC, deleteTodolistAC, type TodolistType } from "../../../../model/todolists-reducer"
import { useAppDispatch } from "common/hooks"

type Props = {
  todolist: TodolistType
}

export const TodolistTitle = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const deleteTodoList = () => dispatch(deleteTodolistAC(todolist.id))
  const changeTodoListTitle = (title: string) => dispatch(changeTodolistTitleAC({ id: todolist.id, title }))

  return (
    <Box sx={titleContainer}>
      <Typography variant={"h5"} component={"h2"} sx={todolistTitle}>
        <EditableSpan value={todolist.title} onChange={changeTodoListTitle} />
      </Typography>
      <IconButton onClick={deleteTodoList} size={"small"}>
        <DeleteIcon />
      </IconButton>
    </Box>
  )
}
