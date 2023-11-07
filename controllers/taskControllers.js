const Task = require("../models/TaskModel")

exports.createTask = (req,res)=>{
    const email = req.headers.email
    const reqBody = req.body
    reqBody.email = email
    
     Task.create(reqBody,(err,data)=>{
        if(err){
            res.status(400).json({
                success:false,
                message:err.message
            })
        }else{
            res.status(201).json({
                success:true,
                data
            })
           
            
        }
       
    })
   
}
exports.getAllTask = async(req,res)=>{
    try {
        const tasks = await Task.find({})
        res.status(200).json({
          success:true,
          tasks  
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.deleteTask = (req,res)=>{
    const {id} = req.params
    Task.remove({_id:id},(err,data)=>{
        if(err){
            res.status(400).json({
                success:false,
                message:err.message
            })
        }else{
            res.status(200).json({
                success:true,
                message:`deleted this`,
                data
            })
        }
    })
}

exports.updateStatus = (req,res)=>{
    const id = req.params.id;
    const status = req.params.status
    Task.updateOne({_id:id},{status},(err,data)=>{
        if(err){
            res.status(400).json({
                success:false,
                message:err.message
            })
        }else{
            res.status(200).json({
                success:true,
                message:`Status Updated `,
                data
            })
        }
    })
}

exports.getTaskByStatus = (req,res)=>{
    const status = req.params.status
   const email = req.headers.email
   Task.aggregate([
    {$match:{email:email,status:status}},
    {$project:{_id:1,title:1,description:1,status:1,createdDate:{
        $dateToString:{
            date:"$createdDate",
            format:"%d-%m-%Y"
        }
    }}}
   ],(err,data)=>{
    if(err){
        res.status(400).json({
            success:false,
            message:err.message
        })
    }else{
        res.status(200).json({
            success:true,
            data
        })
    }
   })
}

exports.taskStatusCount = (req,res)=>{
    const email = req.headers.email
    Task.aggregate([
        {$match:{email:email}},
        {$group:{_id:"$status",sum:{$count:{}}}}
    ],(err,data)=>{
        if(err){
            res.status(400).json({
                success:false,
                message:err.message
            })
        }else{
            res.status(200).json({
                success:true,
                data
            })
        }
    })
    
}