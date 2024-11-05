import {useState, ChangeEvent} from 'react';

type EditableSpanType = {
    value: string
    updateTitle: (title: string) => void
}

export const EditableSpan = ({value, updateTitle}: EditableSpanType) => {
    const [editMode, setEditMode] = useState(false)
    const [newValue, setNewValue] = useState(value)

    const activateEditMode = () => setEditMode(true)
    const deactivateEditMode = () => {
        setEditMode(false);
        updateTitle(newValue);
    }
    const onChangeHandler = ( e: ChangeEvent<HTMLInputElement>) => setNewValue(e.currentTarget.value)

    return (
        <>
            {editMode
                ? (<input value={newValue} onBlur={deactivateEditMode} onChange={onChangeHandler} autoFocus/>)
                : (<span onDoubleClick={activateEditMode}>{value}</span>)
            }
        </>
    );
};