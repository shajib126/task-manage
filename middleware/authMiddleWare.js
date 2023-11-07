const jwt = require('jsonwebtoken')

exports.auth = (req,res,next)=>{
    let Token = req.headers.token
    jwt.verify(Token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
        }else{
           
            let email = decoded.data
            req.headers.email = email
            next()

        }
    })
}