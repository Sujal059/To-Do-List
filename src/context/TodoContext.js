import React, {useReducer, createContext, useEffect} from "react";

export const TodoContext = createContext();

//get data from local storage
const getTodos = ()=>{
    const todos = localStorage.getItem('todos');
    if(todos){
        return JSON.parse(todos);
    }else{
        return [];
    }
};

//initial state
const INITIAL_STATE = getTodos();

//reducer function
const todoReduce = (state, action) =>{
    const {type, payload} = action;
    switch(type){
        case 'ADD_TODO':
            return [...state, payload];
        case 'REMOVE_TODO':
            return state.filter(todo => todo.id !== payload);
        default:
            return state;
    }
};


export const TodoContextProvider = ({children}) => {
    
    const [todos, dispatch] = useReducer(todoReduce, INITIAL_STATE);

    //save to local storage
    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos))
    },[todos]);

    //Add Todo Action
    const addTodoAction = (title) =>{
        dispatch({
            type: "ADD_TODO",
            payload: {                  //payload is the data we want to add to the original data
                id:todos.length +1,
                title, 
            },         
        })
    }

    //Remove todo
    const removeTodoAction = (id) => {
        dispatch({
            type: 'REMOVE_TODO',
            payload: id,
        })
    }

    return (
        <>
            <TodoContext.Provider value={{todos, addTodoAction, removeTodoAction}}>
                {children}
            </TodoContext.Provider>
        </>
    )
}