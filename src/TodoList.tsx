import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStaus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}

export function TodoList(props: PropsType) {
    const [error, setError] = useState<string | null>(null);
    const [newTaskTitle, setNewTaskTitle] = useState('');
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
            props.addTask(newTaskTitle.trim(), props.id)
            setNewTaskTitle('');
        } else {
            setError("Title is required")
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter('All', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('Active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('Completed', props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id);
    }

    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoList}>x</button></h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStaus(t.id, e.currentTarget.checked, props.id);
                            console.log(t.id + e.currentTarget.checked);
                        }
                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type='checkbox'
                                   checked={t.isDone}
                                   onChange={onChangeHandler}
                            /><span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }

            </ul>
            <div>
                <button
                    className={props.filter === 'All' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === 'Active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === 'Completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}