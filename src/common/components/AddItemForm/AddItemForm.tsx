import { ChangeEvent, KeyboardEvent, useState } from 'react'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

type Props = {
  addItem: (title: string) => void
}

export const AddItemForm = ({ addItem }: Props) => {
  const [itemTitle, setItemTitle] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null)
    setItemTitle(e.currentTarget.value)
  }
  const keyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    return e.key === 'Enter' && addItemHandler()
  }
  const addItemHandler = () => {
    itemTitle.trim() !== '' ? addItem(itemTitle.trim()) : setErrorMessage('Title is required')
    setItemTitle('')
  }

  return (
    <>
      <TextField
        value={itemTitle}
        variant={'outlined'}
        label={'Enter a title'}
        onChange={changeInputHandler}
        onKeyUp={keyUpHandler}
        error={!!errorMessage}
        helperText={errorMessage}
        size={'small'}
      />
      <IconButton onClick={addItemHandler}>
        <AddBoxOutlinedIcon />
      </IconButton>
    </>
  )
}
