import { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

type Props = {
  value: string
  updateTitle: (title: string) => void
}

export const EditableSpan = ({ value, updateTitle }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const [newValue, setNewValue] = useState(value)

  const activateEditMode = () => setEditMode(true)
  const deactivateEditMode = () => {
    setEditMode(false);
    updateTitle(newValue);
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewValue(e.currentTarget.value)

  return (
    <>
      {editMode
        ? (<TextField value={newValue} variant={'standard'} onBlur={deactivateEditMode} onChange={onChangeHandler} autoFocus />)
        : (<span onDoubleClick={activateEditMode}>{value}</span>)
      }
    </>
  );
};