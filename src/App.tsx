import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

export type FilterValuesType = 'All'|'Active'|'Completed'

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "Js", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('All');

function removeTask(id: number) {
let filteredTasks = tasks.filter( t => t.id !==id)
    setTasks(filteredTasks)
}

function changeFilter (value: FilterValuesType) {
    setFilter(value);
}

let tasksForTodoList = tasks;
if(filter === 'Completed') {
    tasksForTodoList = tasks.filter( t => t.isDone === true);
}
    if(filter === 'Active') {
        tasksForTodoList = tasks.filter( t => t.isDone === false);
    }

    return (
        <div className="App">
            <TodoList
                title='What to learn'
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
