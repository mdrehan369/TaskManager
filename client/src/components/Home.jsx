import React, { useEffect, useState } from "react";
import "../../public/css/home.css";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Tasks from "./Tasks";

function Home() {
  const { user, isUpdate, setUser } = useUserContext();
  const nav = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading((prev) => !prev);
    const token = localStorage.getItem("token");
    if(token === '') {
      setLoading((prev) => !prev);
      return;
    };
    // if(!user.username) {
    //   setLoading((prev) => !prev);
    //   return;
    // }
    try {
      let res = await axios.get(`/api/getTasks/${user.username}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setTasks((prev) => res.data.Items);
    } catch (e) {
      
    }
    setLoading((prev) => !prev);
  };

  const fetchUser = async () => {
    if(Object.keys(user).length !== 0) return;
    const token = localStorage.getItem("token");
    if(token === "") return;
    try{
      let res = await axios.get("/api/getUser", {
          headers: {'authorization': `Bearer ${token}`}
      });

      if(res.status === 200) {
          setUser(res.data.data);
      }
    } catch(e) {
      // console.log(e);
    }
  } 

  useEffect(() => {
    fetchUser();
  }, [])

  useEffect(() => {
    fetchData();
  }, [isUpdate]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  let i = 0;

  return (
    <div className={`container`}>
      {!loading && Object.keys(user).length === 0 && (
        <>
          <h1>Welcome !</h1>
          <br />
          <h3>Please Login Or Signup To Continue</h3>
        </>
      )}

      {
        loading && (<img src="../../public/images/spinner.gif" width="3%"/>)
      }

      {!loading && Object.keys(user).length !== 0 && (
        <div className="container dark">
          <button onClick={() => nav("/addTask")} id="addtask">Add Task</button>
          {tasks.map((task) => (
            <Tasks key={i++} task={task}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
