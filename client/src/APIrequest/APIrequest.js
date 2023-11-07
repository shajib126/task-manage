import axios from 'axios'
import { ErrorToast, SuccessToast } from '../helper/FormHelper'
import { getToken, setEmail, setOTP, setToken, setUserDetails } from '../helper/SessionHelper';
import { setProfile } from '../redux/stateSlice/profileSlice';
import { ShowLoader,HideLoader } from '../redux/stateSlice/settingSlice'
import { setSummery } from '../redux/stateSlice/summeryslice';
import { SetCanceled, SetCompletedTask, SetNewTask, SetProgressTask, SetTasks } from '../redux/stateSlice/taskSlice';
import store from '../redux/store'
import { UnAuthorizedRequest } from './UnAuthorizeRequest';

const axiosHeader ={headers:{"token":getToken()}}

export function registrationRequest(email,firstname,lastname,mobile,password,photo){
    console.log(email,firstname,lastname,password,mobile);
    store.dispatch(ShowLoader())
    
    const url = 'http://localhost:5000/api/v1/user/register'
    const postBody = {firstname,lastname,email,mobile,password,photo}
    return axios.post(url,postBody).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===201){
            if(res.data['status']==="fail"){
                if(res.data['data']['keyPattern']['email']===1){
                    ErrorToast("Email Already Exist")
                    return false;
                }
                else{
                    ErrorToast("Something Went Wrong")
                    return false;
                }
            }
            else {
                SuccessToast("Registration Success")
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return  false;
        }
    }).catch((err)=>{
        store.dispatch(HideLoader())
        ErrorToast(`Something Went Wrong ${err}` )
        UnAuthorizedRequest(err)
        return false
    })
}

export function LoginRequest(email,password){
    store.dispatch(ShowLoader())
    const url = 'http://localhost:5000/api/v1/user/login'
    const postBody = {email,password}
    return axios.post(url,postBody).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status === 200){
            setToken(res.data.token)
            setUserDetails(res.data.data)
            SuccessToast("Successfully LoggedIn")
        }else{
            ErrorToast("Invalid Email or Password")
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong" + err.message)
        store.dispatch(HideLoader())
        UnAuthorizedRequest(err)
        return false

    })
}

export function createNewTask(title,description,status){
    store.dispatch(ShowLoader())
    const url = 'http://localhost:5000/api/v1/task/create'
    const postBody = {title,description,status}
    return axios.post(url,postBody,axiosHeader).then((res)=>{
        if(res.status === 201){
            store.dispatch(HideLoader())
            SuccessToast("Task created Successfully")
            return true
        }else{
            ErrorToast("Something went Wrong")
            return false
        }
    }).catch((err)=>{
        ErrorToast(`${err.message}`)
        store.dispatch(HideLoader())
        UnAuthorizedRequest(err)
        return false
    })
}

export function getAllTask(){
    store.dispatch(ShowLoader())
    const url = 'http://localhost:5000/api/v1/task'
    return axios.get(url,axiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status === 200){
            store.dispatch(SetTasks(res.data.tasks))
        }else{
            ErrorToast('Something went wrong')
        }
    })

}

export function taskListByStatus(status){
    console.log(status);
    store.dispatch(ShowLoader())
    const url = `http://localhost:5000/api/v1/task/${status}`
    axios.get(url,axiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status === 200){
            if(status === 'New'){
                store.dispatch(SetNewTask(res.data.data))
            }else if(status === 'Completed'){
                store.dispatch(SetCompletedTask(res.data.data))
            }else if(status === 'Canceled'){
                store.dispatch(SetCanceled(res.data.data))
            }else if(status === 'Progress'){
                store.dispatch(SetProgressTask(res.data.data))
            }else{
                ErrorToast("Something went Wrong")
            }
        }
    }).catch((err)=>{
        ErrorToast(`${err.message}`)
        store.dispatch(HideLoader())
        UnAuthorizedRequest(err)
        return false
    })
}

export function updateStatusRequest(id,status){
    store.dispatch(ShowLoader())
    const url = `http://localhost:5000/api/v1/task/update/${id}/${status}`
    return axios.get(url,axiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status === 200){
            SuccessToast("Status Updated")
            return true
        }else{
            ErrorToast("Something Went Wrong")
            return false
        }
    }).catch((err)=>{
        ErrorToast(`${err.message}`)
        store.dispatch(HideLoader())
        UnAuthorizedRequest(err)
        return false
    })
}

export function deleteRequest(id){
    store.dispatch(ShowLoader())
    const url = `http://localhost:5000/api/v1/task/delete/${id}`
    return axios.get(url,axiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status === 200){
            SuccessToast("Task Deleted")
            return true
        }else{
            ErrorToast("Something went wrong")
            return false
        }
    }).catch((err)=>{
        ErrorToast(`${err.message}`)
        store.dispatch(HideLoader())
        UnAuthorizedRequest(err)
        return false
    })
}

export function summeryRequest(){
    store.dispatch(ShowLoader())
    const url = 'http://localhost:5000/api/v1/task/task/count'
    axios.get(url,axiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status === 200){
            store.dispatch(setSummery(res.data.data))
        }else{
            ErrorToast('Something went wrong')
        }
    }).catch((err)=>{
        ErrorToast(`${err.message}`)
        store.dispatch(HideLoader())
        UnAuthorizedRequest(err)
        return false
        
    })
}

export function getProfileDetails(){
    store.dispatch(ShowLoader())
    const url = 'http://localhost:5000/api/v1/user/me'
    axios.get(url,axiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status === 200){
            store.dispatch(setProfile(res.data.data[0]))
        }else{
            ErrorToast("Something went wrong")
        }
    }).catch((err)=>{
        ErrorToast(`${err.message}`)
        store.dispatch(HideLoader())
        UnAuthorizedRequest(err)
        
    })
}

export function profileUpdateRequest(email,firstname,lastname,mobile,password,photo){
    store.dispatch(ShowLoader())
    const url = `http://localhost:5000/api/v1/user/update`
    const postBody = {email,firstname,lastname,mobile,password,photo}
    const userDetails = {email,firstname,lastname,mobile,photo}
    return axios.post(url,postBody,axiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status === 200){
            SuccessToast('Profile Updated')
            setUserDetails(userDetails)
            return true
        }else{
            ErrorToast("Something went wrong")
            return false
        }
    }).catch((err)=>{
        ErrorToast(`${err.message}`)
        store.dispatch(HideLoader())
        UnAuthorizedRequest(err)
        return false
    })
}


export function recoverVerifyEmailRequest(email){
    store.dispatch(ShowLoader())
    const url = `http://localhost:5000/api/v1/user/recoverVerifyEmail/${email}`
    return axios.get(url).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status ===200){
            if(res.data.success === false){
                ErrorToast("User not found")
                return false
            }else{
                setEmail(email)
                SuccessToast("6 digit verification code has been sent to your email")
                return true
            }
        }else{
            ErrorToast("Something went wrong")
            return false
        }
    }).catch((err)=>{
        ErrorToast(`${err.message}`)
        store.dispatch(HideLoader())
        UnAuthorizedRequest(err)
        return false
    })
}

export function recoverVerifyOTPRequest(email,OTP){
    store.dispatch(ShowLoader())
    const url = `/api/v1/user/recoverVerifyOTP/${email}/${OTP}`
    return axios.get(url).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status === 200){
            if(res.data.success === false){
                ErrorToast(res.data.data)
                return false
            }else{
                setOTP(OTP)
                SuccessToast("Code verification Success")
                return true
            }
        }else{
            ErrorToast("Something went Wrong!")
            return false
        }
    }).catch((err)=>{
        ErrorToast(`${err.message}`)
        store.dispatch(HideLoader())
        UnAuthorizedRequest(err)
        return false
    })
}

export function recoverResetPassRequest(email,OTP,password){
    store.dispatch(ShowLoader())
    let url='/api/v1/user/recoverResetPassword'
    let postBody={email:email,OTP:OTP,password:password}

    return axios.post(url,postBody).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){

            if(res.data.success === false){
                ErrorToast(res.data.data);
                return false;
            }
            else{
                setOTP(OTP) //
                SuccessToast("NEW PASSWORD CREATED");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        UnAuthorizedRequest(err)
        return false;
    });
}