import './home.css'; 
import { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:3001'; 

function Home() {
  const [todos, setTodos] = useState([]); 
  const [popupActive, setPopupActive] = useState(false); 
  const [newTodo, setNewTodo] = useState(''); 

  useEffect(()=>{
    GetTodos(); 
    console.log('useEffect')
    console.log(todos);
  },[])

  const GetTodos = () =>{
    fetch(API_BASE+'/todos')
    .then(res => res.json())
    .then(data => setTodos(data))
    .catch(err => console.error("Error:", err));
  }

  const completeTodo = async id => {
    const data = await fetch(API_BASE + "/todo/complete/" + id)
    .then(res => res.json()); 
    
    setTodos(todos => todos.map(todo => {
      if(todo._id === data._id){
        todo.complete = data.complete; 
      }
      return todo; 
    }))
  }

  const deleteTodo = async id => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {method: "Delete"}).then(res=>res.json());
    setTodos(todos => todos.filter(todo => todo._id !== data._id) )
  }

  const addTodo = async () => {
    const data = await fetch(API_BASE+"/todo/new", {method:"post", headers: {"Content-Type":"application/json"}, body: JSON.stringify({text:newTodo})}).then(res=>res.json())
    setTodos([...todos, data])
    setPopupActive(false)
    setNewTodo("")
  }

  return (
    <div className='home'>
      <h1>Welcome </h1>
      <h4>Your Tasks</h4>
      <div className="todos">
        {
          todos.map(todo=>(
            <div className={"todo" + (todo.complete? " iscomplete" : "")} key={todo._id} onClick={()=>completeTodo(todo._id)}>
                  <div className="checkbox"></div>
                  <div className="text">{todo.text}</div>
                  <div className="deleteTodo" onClick={()=>deleteTodo(todo._id)}>x</div>
            </div> 
          ))
        }
      </div>
      <div className="addPopup" onClick={()=>setPopupActive(true)}>+</div>
        {
          popupActive ? (
            <div className="popup"> 
            <div className='closePopup' onClick={()=>setPopupActive(false)}>x</div>
            <div className="content">
              <h3>Add Task</h3>
              
              <input type='text' className='addTodoInput' onChange={e=> setNewTodo(e.target.value)}  value={newTodo}/>
              <div className="button" onClick={addTodo} onke>Create Task</div>
            </div> 
          </div>
          ) : ' '
        }
        
    </div>
  )
}

export default Home