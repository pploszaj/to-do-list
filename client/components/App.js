import React, { useState } from "react";
import Home from "./Home";
import SignUp from "./SignUp";
import "./index.css";
import Login from "./Login"
import TodoContainer from "./TodoContainer";

function App() {
  const [onSignUpPage, setOnSignUpPage] = useState(false);
  const [onLoginPage, setOnLoginPage] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [userList, setUserList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const signUpHandler = () => {
    setOnSignUpPage(!onSignUpPage);
  }

  const loginHandler = () => {
    setOnLoginPage(!onLoginPage);
  }

  const userCreatedHandler = () => {
    console.log('inside userCreatedHandler')
    setUserCreated(!userCreated);
  }

  const userListHandler = (data) => {
    setUserList(data);
    console.log('new list', userList);
  }

  const isLoggedInHandler = () => {
    setLoggedIn(!loggedIn);
  }


  if (onSignUpPage === false && onLoginPage === false && loggedIn === false) {
    return (
      <div className="app">
        <Home signUpHandler = {signUpHandler} loginHandler = {loginHandler}/>
      </div>
    );
  }

  if(onSignUpPage === true && onLoginPage === false && userCreated === false)  {
    return (
        <div className="app">
          <SignUp userCreatedHandler = {userCreatedHandler}/>
        </div>
      );
  }

  if(onLoginPage === true && onSignUpPage === false && userCreated === false) {
    return (
        <div className="app">
          <Login userListHandler = {userListHandler} isLoggedInHandler = {isLoggedInHandler} loginHandler = {loginHandler}/>
        </div>
      );
  }

  if(loggedIn === true || userCreated === true) {
    return (
      <div className="app">
        <TodoContainer userList = {userList}/>
      </div>
    );
  }

  
}

export default App;
