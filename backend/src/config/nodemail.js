const nodemailer = require('nodemailer');

const gmailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.APP_PASSWORD
    }
});
const GmailOptions = {
    from: process.env.MAIL_EMAIL,
    to: "",
    subject: 'Password Reset',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
           Please click on the following link, or paste this into your browser to complete the process:\n\n
           http://your-website.com/reset-password?token=<token>\n\n
           If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
           <p>Please click on the following link, or paste this into your browser to complete the process:</p>
           <a href="http://your-website.com/reset-password?token=$<token>">Reset Password</a>
           <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
};

// const sendmail= async(mailOptions)=>{


//     await gmailTransporter.sendMail(mailOptions,(error,info)=>{
//         if(error){
//             console.log("cannot send email")
//         }
//         console.log("reset link send:"+info.messageId )
//     })
// }

// (async()=>{
//     await sendmail(GmailOptions)
// })()

module.exports ={gmailTransporter,GmailOptions}




