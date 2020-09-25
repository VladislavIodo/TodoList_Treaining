import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = "All" | "Active" | "Completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action);
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(value, todolistId);
        dispatch(action)
    }

    function removeTodolist(id: string) {
        const action = removeTodolistAC(id);
        dispatch(action);
    }

    function changeTodolistTitle(id: string, title: string) {
        const action = changeTodolistTitleAC(id, title);
        dispatch(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title);
        dispatch(action);
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "Active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "Completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodoList={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;


// import React, {useReducer, useState} from 'react';
// import './App.css';
// import {TaskType, TodoList} from "./TodoList";
// import {v1} from "uuid";
// import {AddItemForm} from "./AddItemForm";
// import {AppBar, Button, IconButton, Typography, Toolbar} from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
// import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// import {
//     addTodolistAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC,
//     removeTodolistAC,
//     todolistsReducer
// } from "./state/todolists-reducer";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
//
// export type FilterValuesType = 'All' | 'Active' | 'Completed';
//
// export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
//
// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }
//
//
// function AppWithReducers() {
//
//     let todoListId1 = v1();
//     let todoListId2 = v1();
//
//     let [todoLists, dispatchToTodolistsReducer] = useReducer( todolistsReducer, [
//         {id: todoListId1, title: 'What to learn', filter: 'All'},
//         {id: todoListId2, title: 'What ???', filter: 'All'}
//     ]);
//
//     let [tasksObj, dispatchToTasksReducer] = useReducer( tasksReducer, {
//         [todoListId1]: [{id: v1(), title: "CSS", isDone: true},
//             {id: v1(), title: "Js", isDone: true},
//             {id: v1(), title: "React", isDone: false}],
//         [todoListId2]: [{id: v1(), title: "CSSIIIIIIOOOOO", isDone: true},
//             {id: v1(), title: "Jseeeee", isDone: true},
//             {id: v1(), title: "ReactOOOOOOOOOO", isDone: false}],
//     })
//
//     function removeTask(id: string, todoListId: string) {
//         const action = removeTaskAC(id, todoListId);
//         dispatchToTasksReducer(action);
//     }
//
//     function addTask(title: string, todoListId: string) {
//         const action = addTaskAC(title, todoListId);
//         dispatchToTasksReducer(action);
//     }
//
//     function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
//         const action = changeTaskStatusAC(taskId, isDone, todoListId);
//         dispatchToTasksReducer(action);
//     }
//
//     function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
//         const action = changeTaskTitleAC(taskId, newTitle, todoListId);
//         dispatchToTasksReducer(action);
//     }
//
//     function changeFilter(value: FilterValuesType, todoListId: string) {
//         const action = changeTodolistFilterAC(value, todoListId);
//         dispatchToTodolistsReducer(action)
//     }
//
//
//     function removeTodoList (todoListId: string) {
//         const action = removeTodolistAC(todoListId);
//         dispatchToTasksReducer(action);
//         dispatchToTodolistsReducer(action);
//     }
//
//     function changeTodoListTitle(id: string, newTitle: string) {
//         const action = changeTodolistTitleAC(id, newTitle);
//         dispatchToTodolistsReducer(action);
//     }
//
//
//     function addTodoList(title: string) {
//         const action = addTodolistAC(title);
//         dispatchToTasksReducer(action);
//         dispatchToTodolistsReducer(action);
//     }
//
//
//     return (
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6">
//                         News
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{padding: "20px"}}>
//                     <AddItemForm addItem={addTodoList}/>
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {
//                         todoLists.map((tL) => {
//
//                             let tasksForTodoList = tasksObj[tL.id];
//
//                             if (tL.filter === 'Completed') {
//                                 tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
//                             }
//                             if (tL.filter === 'Active') {
//                                 tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
//
//                             }
//
//                             return <Grid item>
//                                 <Paper style={{padding: "10 px"}}>
//                                     <TodoList
//                                         key={tL.id}
//                                         id={tL.id}
//                                         title={tL.title}
//                                         tasks={tasksForTodoList}
//                                         removeTask={removeTask}
//                                         changeFilter={changeFilter}
//                                         addTask={addTask}
//                                         changeTaskStatus={changeStatus}
//                                         changeTaskTitle={changeTaskTitle}
//                                         filter={tL.filter}
//                                         removeTodoList={removeTodoList}
//                                         changeTodoListTitle={changeTodoListTitle}
//                                     />
//                                 </Paper>
//                             </Grid>
//                         })
//                     }
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default AppWithReducers;
