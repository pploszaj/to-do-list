import React, { useState } from 'react'
import './SignUp.css'


function SignUp(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    
    const usernameHandler = (event) => {
        setUsername(event.target.value)
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }


    const formSubmitHandler = (event) => {
        event.preventDefault()
        const userData = {
          username: username,
          password: password
        }

       console.log(JSON.stringify(userData))
  
        fetch('/api/signup', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(data => {
          console.log('data', data)
          props.userCreatedHandler();
        })
        .catch(err => console.log('oops', err))
        
    }

  return (
    <div className="sign_up_container">
      <h1>Create an Account</h1>
      <form className="form" onSubmit={formSubmitHandler}>
        <input type="text" placeholder="Username" autoComplete='off' onChange={usernameHandler}></input>
        <input type="password" placeholder="Password" onChange={passwordHandler}></input>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp