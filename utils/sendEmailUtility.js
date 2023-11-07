const nodemailer = require('nodemailer')

const sendEmailUtility = async(emailTo,emailText,emailSubject)=>{
    console.log(emailTo,emailText,emailSubject);
    let config ={
        service:"gmail",
        auth:{
            user:process.env.MAIL_HOST,
            pass:process.env.MAIL_PASS
        }
    }
    
    let transporter = nodemailer.createTransport(config)

    let mailOptions ={
        from:'Task Manager <shajib126@gmail.com>',
        to:emailTo,
        subject:emailSubject,
        text:emailText
    }
    return await transporter.sendMail(mailOptions)
}

module.exports = sendEmailUtility