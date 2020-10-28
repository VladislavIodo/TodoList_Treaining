import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Button, IconButton, Checkbox} from "@material-ui/core";

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
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export const TodoList = React.memo((props: PropsType) => {

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
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle);
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, []);

    let tasksForTodolist = props.tasks;
    if (props.filter === "Active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "Completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                {/*<button onClick={removeTodoList}>x</button>*/}
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasksForTodolist.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                            //console.log(t.id + e.currentTarget.checked);
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id);

                        }
                        return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <Checkbox
                                color="primary"
                                checked={t.isDone}
                                onChange={onChangeStatusHandler}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            {/*<button onClick={onRemoveHandler}>x</button>*/}
                            <Button
                                onClick={onRemoveHandler}><Delete/></Button>
                        </div>
                    })
                }

            </div>
            <div>
                <Button
                    color={"default"}
                    variant={props.filter === 'All' ? 'outlined' : 'text'} onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={"secondary"}
                    variant={props.filter === 'Active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={"primary"}
                    variant={props.filter === 'Completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
});

