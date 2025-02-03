import { useState, ChangeEvent } from 'react'
import TextField from '@mui/material/TextField'

type Props = {
  value: string
  onChange: (title: string) => void
  disabled: boolean
}

export const EditableSpan = ({ value, onChange, disabled }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const [newValue, setNewValue] = useState(value)

  const activateEditMode = () => {
    if (!disabled) {
      setEditMode(true)
    }
  }
  const deactivateEditMode = () => {
    setEditMode(false)
    onChange(newValue)
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewValue(e.currentTarget.value)

  return (
    <>
      {editMode ? (
        <TextField
          value={newValue}
          variant={'standard'}
          onBlur={deactivateEditMode}
          onChange={onChangeHandler}
          autoFocus
        />
      ) : (
        <span onDoubleClick={activateEditMode}>{value}</span>
      )}
    </>
  )
}
