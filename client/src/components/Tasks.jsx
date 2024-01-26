import React, { useState } from "react";
import "../../public/css/tasks.css";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";

function Tasks({ task }) {
  const [visible, setVisible] = useState("hidden");
  const [isEditable, setIsEditable] = useState(true);
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description);
  const [date, setDate] = useState(task.dueDate);
  const [msg, setMsg] = useState("");
  const { setIsUpdate } = useUserContext();

  const handleEdit = (e) => {
    setIsEditable((prev) => !prev);
  };

  const handleDelete = async (e) => {
    const token = localStorage.getItem("token");
    try{
        await axios.get(`/api/delete/${task.id}`, {
            headers: {'authorization' : `Bearer ${token}`}
        });
        setIsUpdate((prev) => !prev);

    } catch(e) {
        console.log(e);
    }
  }

  const handleSave = async (e) => {
    setIsEditable((prev) => !prev);

    const update = {
        title: title,
        description: desc,
        dueDate: date,
        id: task.id
    }

    const token = localStorage.getItem("token");

    try{
        await axios.post("/api/update", update, {
            headers: {'authorization' : `Bearer ${token}`}
        });

    }catch(e) {
        setMsg("Some Error Occured ! Try Again Later");
    }

  }

  return (
    <div
      className={`main`}
      onMouseEnter={(e) => setVisible("visible")}
      onMouseLeave={(e) => setVisible("hidden")}
    >
      <input type="text" value={title} disabled={isEditable} className="inp" onChange={(e) => setTitle(e.target.value)}/>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        value={desc}
        disabled={isEditable}
        onChange={(e) => setDesc(e.target.value)}
      />
      <label htmlFor="date">Due Date:</label>
      <input type="date" value={date} disabled={isEditable} onChange={(e) => setDate(e.target.value)} id="date"/>
      <div className="btn" style={{ visibility: visible }}>
        <button
          className="green"
          style={{ display: !isEditable ? "none" : "block" }}
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="green"
          style={{ display: !isEditable ? "block" : "none" }}
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="red"
          style={{ display: !isEditable ? "none" : "block" }}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <div id='msg' className={msg===""?"":"msg-active"}>{msg}</div>
    </div>
  );
}

export default Tasks;
