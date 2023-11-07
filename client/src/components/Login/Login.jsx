import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginRequest } from '../../APIrequest/APIrequest'
import { ErrorToast, isEmail, isEmpty } from '../../helper/FormHelper'
import { getToken } from '../../helper/SessionHelper'
import './Login.css'

const Login = () => {
  let passRef,emailRef=useRef()
  const navigate = useNavigate()

  const submitLogin = e =>{
    let email = emailRef.value 
    let password = passRef.value
    if(!isEmail(email)){
      ErrorToast("Valid Email Required")
    }else if(isEmpty(password)){
      ErrorToast("Password required")
    }else{
      LoginRequest(email,password).then((result)=>{
        console.log(getToken())
        window.location.href = '/'
      })
    }

  }
  return (
    <>
      <div className="login">
        <h4>SIGN IN</h4>
        <div className="input">
        <label htmlFor="">Email</label>
        <input ref={(input)=>emailRef=input} type="email" placeholder='email' />
        </div>
        <div className="input">
          <label>Password</label>
        <input ref={(input)=>passRef=input} type="password" placeholder='******' />
        </div>
        <button onClick={submitLogin}>Login</button>
        
        <br />
        <span className='signUp_forgotPassword'>
          <Link to='/register'>Sign Up</Link>
          <Link to='/SendOTP'>Forget Password</Link>
        </span>
      </div>
    </>
  )
}

export default Login