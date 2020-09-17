import {FilterValuesType, TodoListType} from '../App'
import {v1} from "uuid";


type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistFilterActionType | ChangeTodolistTitleActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {

        case 'REMOVE-TODOLIST':
            return state.filter(tL => tL.id !== action.id);

        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: "All"}]

        case 'CHANGE-TODOLIST-TITLE':
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title
                return [...state]
            }
            return state;
        case 'CHANGE-TODOLIST-FILTER':
            let todolist = state.find(tL => tL.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
                return [...state];
            }
            return  state;
        default:

            throw new Error("I don't understand this type")


    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export  const addTodolistAC  = (title: string):AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}

export  const changeTodolistTitleAC = (todolistID: string, title: string):ChangeTodolistTitleActionType => {
   return  {type: 'CHANGE-TODOLIST-TITLE', id: todolistID, title: title}
}

export  const changeTodolistFilterAC = (todolistID: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistID, filter: filter}
}

