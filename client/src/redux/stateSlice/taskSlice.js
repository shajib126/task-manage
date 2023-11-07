import { createSlice } from "@reduxjs/toolkit";

export const taskSlice=createSlice({
    name:"task",
    initialState:{
        New:[],
        Tasks:[],
        Completed:[],
        Progress:[],
        Canceled:[]
    },
    reducers:{
        SetNewTask:(state,action)=>{
            state.New = action.payload
        },
        SetTasks:(state,action)=>{
            state.Tasks = action.payload
        },
        SetCompletedTask:(state,action)=>{
            state.Completed = action.payload
        },
        SetProgressTask:(state,action)=>{
            state.Progress = action.payload
        },
        SetCanceled:(state,action)=>{
            state.Canceled = action.payload
        }
    }
})

export const {SetNewTask,SetCompletedTask,SetProgressTask,SetCanceled,SetTasks} = taskSlice.actions
export default taskSlice.reducer;