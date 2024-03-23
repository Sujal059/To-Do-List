import React, { useState, useContext } from 'react'
import { TodoContext } from '../context/TodoContext'
import "./List.css"
import addBtn from "./addBtn.png"
import deleteBtn from "./deleteBtn.png"


const List = () => {
  const {todos, removeTodoAction, addTodoAction} = useContext(TodoContext);


    //Adding todo
    const [title, setTitle] = useState('');

    const handleTitleChange = (e)=>{
        setTitle(e.target.value);
    };


    //submit handler
    const handleSubmit = e => {
        e.preventDefault();
        if(title == ''){
           return alert('please enter todo activity');
        }
        addTodoAction(title);
        setTitle('');
    }
  return (
    <div className='list'>
     <div className='form'>
        <h1>To Do List</h1>
        <form onSubmit={handleSubmit} className='inputs'>
        <input value={title} onChange={handleTitleChange} type='text' id='todo' placeholder='add to do work'/>
        <button  type='submit'><img src={addBtn} alt="add button" /></button>
        </form>
        <div className="listItems">
            <ul>
        {todos.map((todo)=>{
          return(
              <li key={todo.id}>{todo.title} <img onClick={()=>removeTodoAction(todo.id)} src={deleteBtn} alt="delete button" /></li>
          )
        })}
          </ul>
          </div>
     </div>
      
    </div>
  )
}

export default List
