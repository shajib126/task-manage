const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const userRoute = require('./routers/UserRoutes')
const taskRoute = require('./routers/TaskRoutes')
const app = express()

//dep middlware
app.use(express.json({limit:'50mb'}))
app.use(cors())
dotenv.config()
app.use(morgan('common'))
app.use(cookieParser())
app.use(helmet())


//
app.use('/api/v1/user',userRoute)
app.use('/api/v1/task',taskRoute)



//
app.use(express.static(path.join(__dirname,"./client/build")))
app.get("*",function(_,res){
    res.sendFile(
        path.join(__dirname,"./client/build/index.html"),
        function(err){
            res.status(500).send(err)
        }
    )
})
//
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log(`DB connected ${mongoose.connection.host}`)
}).catch((err)=>{
    console.log(err)
}).finally(()=>{
    const port = process.env.PORT || 8000
    app.listen(port,()=>console.log(`serverr running in ${port}`))

})