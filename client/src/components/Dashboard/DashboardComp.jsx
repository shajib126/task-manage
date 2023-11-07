import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllTask } from '../../APIrequest/APIrequest'
import './Summery.css'

const DashboardComp = () => {
  const tasks = useSelector((state)=>state.task.Tasks)
  useEffect(()=>{
    getAllTask()
  },[])
  
  console.log(tasks);
  return (
    <div className='summeryList'>
      {tasks ? tasks.map((task,i)=>(
        <div className='summery-card'>
          <h1><span>#{i+1}</span> {task?.title}</h1>
          <p>Description: {task?.description}</p>
          <p>created at : {task?.createdDate}</p>
          <p>Status: {task?.status}</p>

        </div>
      )):<h1>No Task Available</h1>}
    </div>
  )
}

export default DashboardComp