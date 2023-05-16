import React, {useState} from 'react'
import'./Login.css'

function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    
    const usernameHandler = (event) => {
        setUsername(event.target.value)
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }


    const submitHandler = (event) => {
        event.preventDefault()
        const userData = {
          username: username,
          password: password
        }

        fetch('/api/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(userData),
          credentials: 'include',
          
        })
        .then(res => res.json())
        .then(data => {
          console.log('inside .then fetch request')
          console.log(data)
          if(data.err === 'Did not find user'){
            console.log('incorrect username and password')
          }
          else{
            props.userListHandler(data);
            props.loginHandler();
            props.isLoggedInHandler();
          }
        })
        .catch(err => console.log('oops', err))
    }



    return (
        <div className= "login_container">
          <h1>Login</h1>
          <form className="form" onSubmit={submitHandler}>
            <input type="text" placeholder="Username" autoComplete='off' style = {{marginTop : '10%'}}onChange={usernameHandler}></input>
            <input type="password" placeholder="Password" onChange={passwordHandler}></input>
            <button type='submit'>Login</button>
          </form>
        </div>
      )
}

export default Login