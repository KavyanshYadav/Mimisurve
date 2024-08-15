const path = require('node:path');

const { gmailTransporter,GmailOptions } = require("../config/nodemail")
const fs = require('node:fs').promises;


const  GetGmailOptions = async(path,token,email)=>{
    let text = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
           Please click on the following link, or paste this into your browser to complete the process:\n\n
           http://your-website.com/reset-password?token=<token>\n\n
           If you did not request this, please ignore this email and your password will remain unchanged.\n`

    let htmlTemplate = (await fs.readFile(path,"utf-8")).replace("<token>",token)

    let TempGmailOptions = GmailOptions
    TempGmailOptions.text = text.replace("<token>",token)
    TempGmailOptions.html= htmlTemplate
    TempGmailOptions.to = email
    console.log ("gmail:"+email)

    return TempGmailOptions

}
const name  = console.log('name')


const RegisterVerificationOptions = async(path,url,email)=>{
    let text = `You are receiving this because you (or someone else) have requested the registeration for your account.\n\n
           Please click on the following link, or paste this into your browser to complete the process:\n\n
           <url>\n\n
           If you did not request this, please ignore this email and your email will not be consumed.\n`

    let htmlTemplate = (`<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .email-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header h1 {
      color: #007BFF;
      margin: 0;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .content p {
      margin: 0 0 20px;
      color: #555555;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      color: #ffffff;
      background-color: #007BFF;
      text-decoration: none;
      border-radius: 5px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #888888;
      padding-top: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Verify Your Email</h1>
    </div>
    <div class="content">
      <p>Hello [Recipient Name],</p>
      <p>Thank you for signing up. To complete your registration, please verify your email address by clicking the button below:</p>
      <a href="<url>" class="button">Verify Email</a>
      <p>If you did not sign up for this account, you can ignore this email.</p>
    </div>
    <div class="footer">
      &copy; 2024 Your Company Name. All rights reserved.
    </div>
  </div>
</body>
</html>
`).replace("<url>",url)

    let TempGmailOptions = GmailOptions
    TempGmailOptions.text = text.replace("<url>",url)
    TempGmailOptions.html= htmlTemplate
    TempGmailOptions.to = email
    console.log ("gmail:"+email)

    return TempGmailOptions

}

const sendmail= async(mailOptions)=>{

try {
    console.log("Sending email to:"+mailOptions.to)
    await gmailTransporter.sendMail(mailOptions,(error,info)=>{
        try{
        if(error){
            console.log(error)
        }
    
        console.log("reset link send")
    }catch(err){
        console.log(err)
    }
    })

}catch (error) {
    console.log(error)
    }
}



module.exports ={GetGmailOptions,RegisterVerificationOptions,sendmail}
