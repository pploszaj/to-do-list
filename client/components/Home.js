import React from "react";
import "./Home.css";

function Home(props) {


  return (
    <div className="home_container">
      <h1>TO-DO APP</h1>
      <div className="button_container">
        <button className="sign_up_button" onClick={props.signUpHandler}>Sign Up</button>
        <button className="login_button" onClick={props.loginHandler}>Log In</button>
      </div>
    </div>
  );
}

export default Home;
