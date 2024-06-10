import React from 'react'

const Todo = (props) => {
    const {todo,setTodos} =props;
    const updateTodo =async(todoId,todoStatus)=>{
        const res =await fetch(`/api/todos/${todoId}`,{
            method:"PUT",
            body: JSON.stringify({status: todoStatus}),
            headers:{
                "Content-Type":"application/json"
            },
        })
        const json =await res.json();
        if(json.acknowledged) {
            setTodos( currentTodos => { return currentTodos.map((currentTodo)=>{
                if(currentTodo._id == todoId){
                    return {...currentTodo,status: ! currentTodo.status}
                }
                return currentTodo;
            
            })})
        }
    }
    const deleteTodo =async(todoId) => {
        const  res =await fetch(`/api/todos/${todoId}`,{
            method:"DELETE",
        })
        const json =await res.json();
        setTodos( currentTodos =>{
            return currentTodos.filter((currentTodo)=>(currentTodo._id !== todoId));
        })
    }
  return (
    <div  className='flex justify-center border border-gray-200 bg-gray-50 rounded-3xl p-2 my-8 hover:shadow-2xl duration-500'>
    <p className='flex justify-center p-2 font-bold w-1/2'>{todo.todo}</p>
    <div className='w-1/2'>
     <button className='hover:border hover:border-gray-100  hover:bg-gray-200 p-2 ml-28 hover:scale-105 duration-500 cursor-pointer hover:rounded-xl' onClick={()=>{ updateTodo(todo._id,todo.status)}}>{(todo.status) ? "✅" : "❌"} </button>
     <button className='hover:border hover:border-gray-100 hover:bg-gray-200  p-2 ml-10 hover:scale-105 duration-500 cursor-pointer hover:rounded-xl' onClick={()=> deleteTodo(todo._id)}>🗑️</button>
    </div>
 </div>
  )
}

export default Todo