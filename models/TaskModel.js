const mongoose = require('mongoose')


const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"New"
    },
    email:{
        type:String,
        required:true
    },
    createdDate:{
        type:Date,
        default:Date.now()
    },
    
    
    
},{versionKey:false})

const Task = mongoose.model("Task",taskSchema)
module.exports = Task