import {Button} from './Button';
import {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: AddItemFormType) => {
    const [itemTitle, setItemTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    let isTitleLengthValid = itemTitle.length < 15;

    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorMessage(null);
        setItemTitle(e.currentTarget.value);
    }
    const keyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        return isTitleLengthValid && e.key === 'Enter' && addItemHandler();
    }
    const addItemHandler = () => {
        itemTitle.trim() !== ''
            ? addItem(itemTitle.trim())
            : setErrorMessage('Title is required');
        setItemTitle('');
    }

    return (
        <>
            <input className={errorMessage ? 'error' : ''} type="text" placeholder="Max 15 characters" value={itemTitle}
                   onChange={changeInputHandler} onKeyUp={keyUpHandler}/>
            <Button title="+" onClick={addItemHandler} disabled={!isTitleLengthValid}/>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {!isTitleLengthValid && <div className="error-message">Max 15 characters</div>}
        </>
    );
};
