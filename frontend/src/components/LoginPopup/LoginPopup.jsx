// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axois from 'axios'
const LoginPopup = ({ setShowLogin }) => {
  const {url, setToken} = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login");
  const [data, setData] =useState ({
    name:"",
    email:"",
    password:""
  })

  const onChangeHander= (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data, [name]:value}))
  }


  const onLogin = async (event)=>{
    event.preventDefault()
    let newUrl =url;
    if(currState==="Login"){
      newUrl +="/api/user/login"
    }
    else{
      newUrl += "/api/user/register"
    }

    const reponse = await axois.post(newUrl, data);


    if(reponse.data.success){
      setToken(reponse.data.token);
      localStorage.setItem("token", reponse.data.token)
      setShowLogin(false)
    }
    else{
      alert(reponse.data.message)
    }
  }

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input name='name' onChange={onChangeHander} value={data.name} type="text" placeholder="Your name" required />
          )}
          <input name="email" onChange={onChangeHander} value={data.email} type="email" placeholder="Your email" required />
          <input name ='password' onChange={onChangeHander} value={data.password} type="password" placeholder="Your password" required />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>De tieps tuc toi dong y cac dieu khoan dich vu</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
