

const router = require('express').Router()
const { registerUser, loginUser, updateUser, profileDetails, testSendEmail, recoverVerifyEmial, recoverVerifyOTP, recoverResetPassword } = require('../controllers/userControllers')
const { auth } = require('../middleware/authMiddleWare')
    router.post('/register',registerUser)
    router.post('/login',loginUser)
    router.post('/update',auth,updateUser)
    router.get('/me',auth,profileDetails)
  router.get('/recoverVerifyEmail',recoverVerifyEmial)
  router.get('/recoverVerifyOTP/:email/:otp',recoverVerifyOTP)
  router.post('/recoverResetPassword',recoverResetPassword)
module.exports = router