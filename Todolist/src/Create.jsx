import React, { useState } from 'react'
import axios from 'axios'


const Create = ({ onTaskAdded }) => {
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => 
    {
      if (pass.trim() === '') {
          setError('Task cannot be empty');
          return;
      }

      //axios.post('http://localhost:3001/add', { task:pass })   // Here we are passing value of pass to the task 
      axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/add`, { task:pass })   // Here we are passing value of pass to the task 
          .then(result => {
              onTaskAdded(result.data);  // Notify the parent component of the new task
              setPass('');  // Clear the input field
              setError(''); // Clear any previous errors
          })
          .catch(err => {
              console.log(err);
              setError('An error occurred while adding the task');
          });
  };

  return (
      <div className='create_form'>
          <input
              className='search-bar'
              type="text"
              placeholder='Enter work'
              value={pass}
              onChange={(e) => setPass(e.target.value)}          // Here we will update the pass to user input passed value
          />
          <button className='search-button' type='button' onClick={handleAdd}>Add</button>
          {error && <p className='error-message'>{error}</p>}  {/* Display error message */}
      </div>
  );
};


export default Create
