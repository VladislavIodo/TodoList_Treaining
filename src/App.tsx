import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = 'All' | 'Active' | 'Completed';
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
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
        let task = tasks.find((t) => t.id === taskId)
        if (task) {
            task.isDone = isDone;
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
        {id: todoListId1, title: 'What to learn', filter: 'Active'},
        {id: todoListId2, title: 'What ???', filter: 'Completed'}
    ]);

    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(tL => tL.id !== todoListId);
        setTodoLists(filteredTodoList);
        delete tasksObj[todoListId];
        setTasks({...tasksObj});
    }

    let [tasksObj, setTasks] = useState({
        [todoListId1]: [{id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "Js", isDone: true},
            {id: v1(), title: "React", isDone: false}],
        [todoListId2]: [{id: v1(), title: "CSSIIIIIIOOOOO", isDone: true},
            {id: v1(), title: "Jseeeee", isDone: true},
            {id: v1(), title: "ReactOOOOOOOOOO", isDone: false}],
    })


    return (
        <div className="App">
            {
                todoLists.map((tL) => {

                    let tasksForTodoList = tasksObj[tL.id];

                    if (tL.filter === 'Completed') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
                    }
                    if (tL.filter === 'Active') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false);
                    }
                    return <TodoList
                        key={tL.id}
                        id={tL.id}
                        title={tL.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStaus={changeStatus}
                        filter={tL.filter}
                        removeTodoList={removeTodoList}
                    />
                })
            }

        </div>
    );
}

export default App;
