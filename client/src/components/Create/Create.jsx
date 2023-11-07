import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { createNewTask } from '../../APIrequest/APIrequest'
import { ErrorToast, isEmpty } from '../../helper/FormHelper'
import './Create.css'

const Create = () => {
  let titleRef,descriptionRef = useRef()
  let navigate = useNavigate()

  const CreateNew = ()=>{
    const title = titleRef.value;
    const description = descriptionRef.value
    if(isEmpty(title)){
      ErrorToast("Title Requred")
    }else if(isEmpty(description)){
      ErrorToast("Description Requred")
    }else{
      createNewTask(title,description).then((result)=>{
        if(result){
          navigate('/new')
        }
      })
     
    }
  }
  return (
    <>
      <div className="createNew">
        <h4>New Task</h4>
        <input ref={(input)=>titleRef=input}  type="text" placeholder='Type Title..' />
        <textarea placeholder='Type Description' ref={(input)=>descriptionRef=input} rows={12}></textarea>
        <button onClick={CreateNew}>Create</button>
      </div>
    </>
  )
}

export default Create