import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { taskListByStatus } from '../../APIrequest/APIrequest';
import { deleteTask } from '../../helper/DeleteAlert';
import { updateTask } from '../../helper/UpdateAlert';
import './Progress.css'

const Progress = () => {
  const progressList = useSelector((state) => state.task.Progress)
  useEffect(() => {
    taskListByStatus("Progress");
  }, []);

  const updateStatus = (id,status)=>{
    updateTask(id,status).then((result)=>{
      if(result === true){
        taskListByStatus('Progress')
      }
    })
  }

  const deleteItem=(id)=>{
    deleteTask(id).then((result)=>{
      if(result === true){
        taskListByStatus('Progress')
      }
    })
  }
  return (
    <div className="progress">
      <h3>In Progress Task</h3>
      <div className="search">
        <input type="text" placeholder="search your task" />
        <button>Search</button>
      </div>
      <div className="tasklist">
        {progressList.map((item, i) => (
          <div key={i.toString()} className="progressitemlist">
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
  )
}

export default Progress