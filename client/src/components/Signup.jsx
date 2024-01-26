import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import "../../public/css/signup.css";

function Signup() {
  const nav = useNavigate();
  const { setUser } = useUserContext();
  const [state, setState] = useState("password");
  const [msg, setMsg] = useState("");

  const handleShowPass = () => {
    if (state === "password") setState("text");
    else setState("password");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (e.target.password.value !== e.target.cpassword.value) {
      setMsg("Password And Confirm Password Does Not Match !");
      return;
    }
    const body = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      number: e.target.number.value,
      username: e.target.username.value,
      gender: e.target.gender.value,
    };
    let res = await axios.post("http://localhost:8080/api/signup", body);
    if (res.status === 200) {
      setUser(body);
      localStorage.setItem("token", res.data.token);
      nav("/");
    } else {
      setMsg(res.data);
    }
  };
  return (
    <div className={`containersignup`}>
      <form onSubmit={handleSignup} id="signupForm">
        <div id="msg" className={msg === "" ? "" : "msg-active"}>
          {msg}
        </div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="inp"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="inp"
          required
        />
        <input
          type="number"
          name="number"
          placeholder="Number"
          className="inp"
          required
        />
        <input
          type={state}
          name="password"
          placeholder="Password"
          className="inp"
          required
        />
        <input
          type={state}
          name="cpassword"
          placeholder="Confirm Password"
          className="inp"
          required
        />
        <div className="cb">
          <input type="checkbox" id="showPass" onClick={handleShowPass} />
          <label htmlFor="showPass">Show Password</label>
        </div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="inp"
          required
        />
        <div className="cb">
          <span>
            <input
              type="radio"
              name="gender"
              id="male"
              value="Male"
              defaultChecked
            />
            <label htmlFor="male">Male</label>
          </span>
          <span style={{ marginLeft: "1%" }}>
            <input type="radio" name="gender" id="female" value="Female" />
            <label htmlFor="female">Female</label>
          </span>
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default Signup;
