import React, { useEffect, useState } from 'react'
import Todo from './Todo';

const App = () => {
  const [todos,setTodos] =useState([]);
  const [content,setContent] =useState("");
  useEffect(()=>{
    async function getTodos() {
      const res= await fetch("/api/todos");
      const todos= await res.json();
      setTodos(todos);
    }
    getTodos();
  },[])

  const createNewTodo = async(e)=> {
    e.preventDefault();
    if(content.length >3){
      const res =await fetch("/api/todos",{
        method : "POST",
        body: JSON.stringify({todo : content }),
        headers :{
          "Content-Type": "application/json",
        }
      })
      const newTodo= await res.json();
      setContent("");
      setTodos([newTodo,...todos]);
    }
  }
  return (
    <main className='border border-gray-200 shadow-lg p-10 w-6/12 ml-[26%] mt-[5%] rounded-3xl hover:shadow-2xl duration-500  absolute'>
      <h1 className='text-5xl flex justify-center p-5 font-bold mb-10'>Task Manager</h1>
      <form className='flex justify-center my-10' onSubmit={createNewTodo}>
        <input
        type="text"
        value={content}
        onChange={(e) => {setContent(e.target.value)}}
        placeholder='Enter a new task...'
        required
         className='border border-black rounded-xl p-2 ' />
        <button className='border border-black  p-2 ml-28  hover:bg-green-500 duration-500 cursor-pointer hover:rounded-3xl font-semibold' type='submit'>Create a task</button>
      </form>
      {(todos.length > 0) && 
      todos.map((todo) => (
       <Todo key={todo._id} todo={todo} setTodos={setTodos}/>
      ))
      }
    </main>
  )
}

export default App