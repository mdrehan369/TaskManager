import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import "../css/login.css";

function Login() {
    const [state, setState] = useState("password");
    const [errorMsg, setMsg] = useState("");
    const { setUser, theme } = useUserContext();
    const nav = useNavigate();

    const handleShowPass = () => {
        if(state === 'password') setState('text');
        else setState('password');
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const body = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        try{
          let res = await axios.post("/api/login", body);
          setUser(res.data.user);
          localStorage.setItem("token", res.data.token);
          nav("/");
        } catch(e) {
          setMsg("Username Or Password Is Incorrect!")
        }
        
    }
  return (
    <div className={`containerlogin`}>
      <form onSubmit={handleLogin} className='formlogin'>
        <div id='msg' className={errorMsg===""?"":"msg-active"}>{errorMsg}</div>
        <img src="../../public/images/logoBlack.png" alt="" />
        <input type="text" name='username' placeholder='username' className='inpl'/>
        <input type={state} name="password" placeholder='password' className='inpl'/>
        <div className='cb'>
        <input type="checkbox" id="showPassl" onClick={handleShowPass}/>
        <label htmlFor="showPassl">Show Password</label>
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

export default Login
