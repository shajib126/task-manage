import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { taskListByStatus, updateStatusRequest } from "../../APIrequest/APIrequest";
import { deleteTask } from "../../helper/DeleteAlert";
import { updateTask } from "../../helper/UpdateAlert";
import "./New.css";

const New = () => {
  useEffect(() => {
    taskListByStatus("New");
  }, []);

  const updateStatus = (id,status)=>{
    updateTask(id,status).then((result)=>{
      if(result === true){
        taskListByStatus('New')
      }
    })
  }
  const deleteItem=(id)=>{
    deleteTask(id).then((result)=>{
      if(result === true){
        taskListByStatus('New')
      }
    })
  }
  const newList = useSelector((state) => state.task.New);
  return (
    <div className="new">
      <h3>Task New</h3>
      <div className="search">
        <input type="text" placeholder="search your task" />
        <button>Search</button>
      </div>
      <div className="tasklist">
        {newList.map((item, i) => (
          <div key={i.toString()} className="newitemlist">
            <h6>{item.title}</h6>
            <p>{item.description}</p>
            <p>Created At: {item.createdDate}</p>
              
            <p>Status: {item.status}</p>
            <br />
            <div className="delandedit">
                <span onClick={()=>updateStatus(item._id,item.status)} class="material-symbols-outlined">edit</span>
                <span onClick={()=>deleteItem(item._id)} class="material-symbols-outlined">delete</span>
              </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default New;
