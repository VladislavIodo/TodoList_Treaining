import React from 'react';
import './App.css';
import {ArrayType, TodoList} from "./TodoList";

function App() {

    let tasks1: Array<ArrayType> = [
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "Js", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]
    let tasks2: Array<ArrayType> = [
        {id: 1, title: "Funs", isDone: true},
        {id: 2, title: "Generic", isDone: true},
        {id: 3, title: "React-stations", isDone: false}
    ]


    return (
        <div className="App">
            <TodoList title='What to learn' tasks={tasks1} />
            <TodoList title='Movies' tasks={tasks2} />
        </div>
    );
}

export default App;
