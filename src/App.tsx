import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export type FilterValuesType = 'All' | 'Active' | 'Completed';
 export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    // let [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "CSS", isDone: true},
    //     {id: v1(), title: "Js", isDone: true},
    //     {id: v1(), title: "React", isDone: false}
    // ]);

    // let [filter, setFilter] = useState<FilterValuesType>('All');

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj})
        }

    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle;
            setTasks({...tasksObj})
        }

    }

    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todoListId] = filteredTasks;

        setTasks({...tasksObj});
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todoListId];
        let newTasks = [task, ...tasks];
        tasksObj[todoListId] = newTasks;
        setTasks({...tasksObj});
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        // setFilter(value);
        let todoList = todoLists.find(tL => tL.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'All'},
        {id: todoListId2, title: 'What ???', filter: 'All'}
    ]);

    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(tL => tL.id !== todoListId);
        setTodoLists(filteredTodoList);
        delete tasksObj[todoListId];
        setTasks({...tasksObj});
    }

    function changeTodoListTitle (id: string, newTitle: string) {
        const todoList = todoLists.find(tl => tl.id === id);
        if(todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todoListId1]: [{id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "Js", isDone: true},
            {id: v1(), title: "React", isDone: false}],
        [todoListId2]: [{id: v1(), title: "CSSIIIIIIOOOOO", isDone: true},
            {id: v1(), title: "Jseeeee", isDone: true},
            {id: v1(), title: "ReactOOOOOOOOOO", isDone: false}],
    })

    function addTodoList(title: string) {
        let todoList: TodoListType = {
            id: v1(),
            filter: 'All',
            title: title
        }
        setTodoLists([todoList, ...todoLists]);
        setTasks({
            ...tasksObj,
            [todoList.id]: []
        })
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" >
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
            {
                todoLists.map((tL) => {

                    let tasksForTodoList = tasksObj[tL.id];

                    if (tL.filter === 'Completed') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
                    }
                    if (tL.filter === 'Active') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);

                    }

                    return <Grid item>
                        <Paper style={{padding: "10 px"}}>
                    <TodoList
                        key={tL.id}
                        id={tL.id}
                        title={tL.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                        filter={tL.filter}
                        removeTodoList={removeTodoList}
                        changeTodoListTitle={changeTodoListTitle}
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

export default App;
