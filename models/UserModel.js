const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true,'please enter your email'],
        trim:true,
        unique:true
    },
    firstname:{
        type:String,
        maxlength:[20,'name should not exced 20 charecter']
    },
    lastname:{
        type:String,
        maxlength:[20,'name should not exced 20 charecter']
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{type:String},
    createdDate:{
        type:Date,
        default:Date.now()
    }
},{versionKey:false})





const User = mongoose.model('User',userSchema)
module.exports = User