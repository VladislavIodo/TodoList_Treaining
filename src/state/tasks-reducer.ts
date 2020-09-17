import {TasksStateType} from '../App'
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {act} from "react-dom/test-utils";

export type RemoveTasksActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}


type ActionType = RemoveTasksActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType;


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {

        case 'REMOVE-TASK': {
            let copyState = {...state}
            let todolistTasks = copyState[action.todolistId];
            copyState[action.todolistId] = todolistTasks.filter(t => t.id != action.taskId);
            return copyState
        }

        case 'ADD-TASK': {
            let copyState = {...state}
            let tasks = copyState[action.todolistId];
            let newTask = {id: v1(), title: action.title, isDone: false};
            let newTasks = [newTask, ...tasks]
            copyState[action.todolistId] = newTasks
            return copyState
        }

        case 'CHANGE-TASK-STATUS': {
            let copyState = {...state}
            let tasks = copyState[action.todolistId];
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone;
            }
            return copyState
        }

        case 'CHANGE-TASK-TITLE': {
            let copyState = {...state}
            let tasks = copyState[action.todolistId];
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title;
            }
            return copyState
        }
        case 'ADD-TODOLIST': {
            let copyState = {...state}
            copyState[action.todolistId] = []
            return  copyState
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return  copyState
        }
        default:

            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTasksActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}




