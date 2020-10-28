import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const  AddItemForm = React.memo((props: AddItemFormPropsType) => {
    let [newTaskTitle, setNewTaskTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            // props.addTask(newTaskTitle)
            addTask();
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('');
        } else {
            setError("Title is required")
        }
    }
    return <div>
        <TextField
            variant={"outlined"}
            value={newTaskTitle}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error}
            label="Title"
            helperText={error}
            // className={error ? 'error' : ''}
        />
        {/*<button onClick={addTask}>+</button>*/}
        <IconButton
            color="primary"
            onClick={addTask}>
            <AddBox/>
        </IconButton>
        {/*{error && <div className={'error-message'}>{error}</div>}*/}
    </div>
});