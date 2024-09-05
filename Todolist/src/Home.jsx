import React, { useEffect, useState } from 'react'
import { BsCircleFill, BsFillTrashFill,BsFillCheckCircleFill } from 'react-icons/bs';
import Create from './Create'
import axios from 'axios'

function Home(){

    const [todos,setTodos]=useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/get`)
        .then(result => setTodos(result.data))   // Here we store the data from the database to the "todos"
        .catch(err => console.log(err))
    },[])


  const handleEdit = (id, currentStatus) => {
    // Toggle the `done` status
    axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/update/${id}`, { done: !currentStatus })     // Here we are passing "done" as opposite of the current-status of the done of the component
    .then(response => {
        // Update the todo state with the new status
        setTodos(todos.map(todo =>
            todo._id === id ? { ...todo, done: response.data.done } : todo       // This is for UI to update
        ));
    })
    .catch(err => console.log(err));
};



    const handleDelete = (id) => {
        // axios.delete(`http://localhost:3001/delete/${id}`)
        axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/delete/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo._id !== id));    // This code is for UI , where as data from backend is not used here because to use it we need to reload
            })
            .catch(err => console.log(err));
    };

    
  return (
    <div className='home'>
      <h2>Todo-list</h2>
      <Create onTaskAdded={(newTask) => setTodos([...todos, newTask])} />
      <br />
      {
        todos.length===0    // When we do not have any work
        ? <div><h2>No Work</h2></div>
        : todos.map(i => (
            <div className='task' key={i._id}>
              <div className="checkbox" onClick={() => handleEdit(i._id,i.done)}>
                {i.done 
                ? <BsFillCheckCircleFill className='icon'/>
                : <BsCircleFill className='icon'/>
                }
                <p className={i.done ? "line_through":""} >{i.task}</p>
              </div>
              <div>
                <span><BsFillTrashFill className='icon' onClick={ () => handleDelete(i._id)}/></span>
              </div>
            </div>
        ))
      }
    </div>
  )
}



export default Home
