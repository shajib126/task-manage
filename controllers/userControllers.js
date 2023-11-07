const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const sendEmailUtility = require("../utils/sendEmailUtility");
const OTPModel = require("../models/OTPmodel");

exports.registerUser = (req, res) => {
  try {
    const { firstname, lastname, email,mobile, password, photo } = req.body;
    if (!firstname || !lastname || !email || !mobile || !password) {
      res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: "password should more than 6 charecter",
      });
    } else {
  
      const user = new User({ firstname, lastname, email,mobile, password, photo });

      user.save();
      res.status(201).json({
        success: true,
        user,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.loginUser = (req, res) => {
 const {email,password} = req.body
console.log(email,password);
 User.aggregate([
  {$match:{email,password}},
  {$project:{_id:0,email:1,firstname:1,lastname:1,mobile:1,photo:1}}
 ],(err,data)=>{
  if(err){
    res.status(400).json({success:false,data:err})
  }else{
    if(data){
      let payload = {exp:Math.floor(Date.now()/1000) + (24*60*60),data:data[0].email}
      let token = jwt.sign(payload,process.env.JWT_SECRET)
      res.status(200).json({success:true,token,data:data[0]})
    }else{
      res.status(401).json({status:"unauthorized"})
    }
  }
 })
};

exports.updateUser = (req,res)=>{
  const email = req.headers.email
  const reqBody = req.body
  User.updateOne({email:email},reqBody,(err,data)=>{
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

exports.profileDetails=(req,res)=>{
  const email = req.headers.email
  User.aggregate([
    {$match:{email}},
    {$project:{_id:1,firstname:1,lastname:1,mobile:1,photo:1,password:1,email:1}}
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

exports.recoverVerifyEmial = async(req,res)=>{
  const email = req.params.email;
  let OTPCode = Math.floor(100000 + Math.random() * 900000)
  try {
    const userCount =(await User.aggregate([
      {
        $match:{email}
      },
      {$count:"total"}
    ]))
    if(userCount.length > 0){
      const isExistEmail = await OTPModel.findOne({email})
     if(isExistEmail){
      await OTPModel.updateOne({email},{$set:{otp:OTPCode,status:0}})
     }else{
        await OTPModel.create({email,otp:OTPCode})
     }
     let sendEmail = await sendEmailUtility(email, "Your  PIN code is = " + OTPCode)
     res.status(200).json({
      success:false,
      data:sendEmail
     })
    }else{
      res.status(400).json({success:false,data:'No User found'})
    }
  } catch (error) {
   res.status(500).json({
    success:false,
    message:error.message
   }) 
  }
  
}

exports.recoverVerifyOTP = async(req,res)=>{
  const email = req.params.email
  const OTPCode = req.params.otp;
  const status = 0;
  const statusUpdate = 1;
  try {
    const OTPCount = await OTPModel.aggregate([{
      $match:{email,otp:OTPCode,status:status}
    },{$count:"total"}])
    if(OTPCount.length > 0){
      const OTPUpdate = await OTPModel.updateOne({email,otp:OTPCode,status},{
        email,
        otp:OTPCode,
        status:statusUpdate
      })
      res.status(200).json({success:true,data:OTPUpdate})
    }else{
      res.status(500).json({success:false,message:" OTP already Used"})
    }
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}


exports.recoverResetPassword = async(req,res)=>{
  let email = req.body.email;
  let OTPCode = req.body.OTP;
  const pass = req.body.passowrd
  const statusUpdate = 1
  

  try {
    const OTPCount = await OTPModel.aggregate([{$match: {email: email, otp: OTPCode, status: statusUpdate}}, {$count: "total"}])
    if(OTPCount){
      const passUpdate = await OTPModel.updateOne({email},{
        password:pass
      })
      res.status(200).json({success:true,data:passUpdate})
    }else{
      res.status(400).json({
        success:false,
        data:"Invalid Request"
      })
    }
  } catch (error) {
      res.status(500).json({
        success:false,
        message:error.message
      })
  }
}