import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "../css/addTask.css";

function loadDate() {
  let date = new Date(),
    day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  const todayDate = `${year}-${month}-${day}`;

  document.getElementById("date").defaultValue = todayDate;
  document.getElementById("date").setAttribute("min", todayDate);
}

function AddTasks() {
  const [msg, setMsg] = useState("");
  const { user } = useUserContext();
  const nav = useNavigate();

  useEffect(() => {
    loadDate();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const id = useId();

    const data = {
      username: user.username,
      title: e.target.title.value,
      description: e.target.description.value,
      dueDate: e.target.dueDate.value,
      id: `${Date.now()}`
    };

    const token = localStorage.getItem("token");

    let res = await axios.post("/api/addtask", data, {
      headers: { authorization: `Bearer ${token}` },
    });

    if (res.status === 500) {
      setMsg("Some Error Occured !");
    } else {
      nav("/");
    }
  };

  return (
    <div className={`container-task`}>
      <form onSubmit={handleSubmit}>
        <div id="msg" className={msg === "" ? "" : "msg-active"}>
          {msg}
        </div>
        <input type="text" name="title" placeholder="Title" id="title" />
        <textarea
          name="description"
          cols="30"
          rows="10"
          placeholder="Description"
        ></textarea>
        <label htmlFor="date">Due Date:</label>
        <input type="date" name="dueDate" id="date" />
        <input type="submit" value="Add" id="add" />
      </form>
    </div>
  );
}

export default AddTasks;
