import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

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

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;

const initialState: Array<TodoListType> = []

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [{id: action.todolistId, title: action.title, filter: "All"}, ...state]
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state];
        }
        default:
           return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId}
}
export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string ): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId}
}






// import {FilterValuesType, TodoListType} from '../App'
// import {v1} from "uuid";
//
//
// type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistFilterActionType | ChangeTodolistTitleActionType
//
// export type RemoveTodolistActionType = {
//     type: 'REMOVE-TODOLIST'
//     id: string
// }
//
// export type AddTodolistActionType = {
//     type: 'ADD-TODOLIST'
//     title: string
//     id: string
// }
//
// export type ChangeTodolistTitleActionType = {
//     type: 'CHANGE-TODOLIST-TITLE'
//     id: string
//     title: string
// }
//
// export type ChangeTodolistFilterActionType = {
//     type: 'CHANGE-TODOLIST-FILTER'
//     id: string
//     filter: FilterValuesType
// }
//
// export const todolistsReducer = (state: Array<TodoListType>, action: ActionType) => {
//     switch (action.type) {
//
//         case 'REMOVE-TODOLIST':
//             return state.filter(tL => tL.id !== action.id);
//
//         case 'ADD-TODOLIST':
//             return [...state, {id: action.id, title: action.title, filter: "All"}]
//
//         case 'CHANGE-TODOLIST-TITLE':
//             const todoList = state.find(tl => tl.id === action.id);
//             if (todoList) {
//                 todoList.title = action.title
//                 return [...state]
//             }
//             return state;
//         case 'CHANGE-TODOLIST-FILTER':
//             let todolist = state.find(tL => tL.id === action.id);
//             if (todolist) {
//                 todolist.filter = action.filter;
//                 return [...state];
//             }
//             return  state;
//         default:
//
//             throw new Error("I don't understand this type")
//
//
//     }
// }
//
// export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
//     return { type: 'REMOVE-TODOLIST', id: id}
// }
//
// export  const addTodolistAC  = (title: string):AddTodolistActionType => {
//     return {type: 'ADD-TODOLIST', title: title, id: v1()}
// }
//
// export  const changeTodolistTitleAC = (id: string, title: string):ChangeTodolistTitleActionType => {
//    return  {type: 'CHANGE-TODOLIST-TITLE', id:id, title: title}
// }
//
// export  const changeTodolistFilterAC = ( filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
//     return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id:id}
// }
//
