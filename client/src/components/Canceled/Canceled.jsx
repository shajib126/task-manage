import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { taskListByStatus } from '../../APIrequest/APIrequest';
import { deleteTask } from '../../helper/DeleteAlert';
import { updateTask } from '../../helper/UpdateAlert';
import './Canceled.css'
const Canceled = () => {
  const progressList = useSelector((state) => state.task.Canceled)
  useEffect(() => {
    taskListByStatus("Canceled");
  }, []);

  const updateStatus = (id,status)=>{
    updateTask(id,status).then((result)=>{
      if(result === true){
        taskListByStatus('Canceled')
      }
    })
  }

  const deleteItem=(id)=>{
    deleteTask(id).then((result)=>{
      if(result === true){
        taskListByStatus('Canceled')
      }
    })
  }
  return (
    <div className="canceled">
      <h3>Canceled Task</h3>
      <div className="search">
        <input type="text" placeholder="search your task" />
        <button>Search</button>
      </div>
      <div className="tasklist">
        {progressList.map((item, i) => (
          <div key={i.toString()} className="canceleditemlist">
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

export default Canceled