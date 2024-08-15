const bcrypt = require('bcryptjs/dist/bcrypt');
const prisma = require('../models/PrismaClient');
const { generateAuthToken } = require('../services/jwt');
const crypto = require('crypto');
const { promisify } = require('util');
const { findUserwithEmail, updateUserRestToken, createUserWithEmailandPassword,creteUserData } = require('../services/UserService');
const { GetGmailOptions, sendmail, RegisterVerificationOptions } = require('../services/MailService');
const path = require('node:path');
const { client } = require('../config/redis');
const { CheckEmail, CheckName, CheckPassword, CheckPhoneNumber } = require('../lib/CheckUserInput');
const { v4: uuidv4 } = require('uuid');
const logger = require('../services/LoggerService');


const CreateUser = async(req, res) => {
    let name;
    let password;
    let email;
    let verifyhandler = "email";
    let phoneNumber = "";

    console.log(req.body)
    try {
        if (CheckName(req.body.name)) {
            name = req.body.name;
        } else {
            return res.json({ status: "Name not valid" });
        }

        if (CheckEmail(req.body.email)) {
            email = req.body.email;
        } else {
            return res.json({ status: "email not valid" });
        }

        if (CheckPassword(req.body.password)) {
            password = req.body.password;
        } else {
            return res.json({ status: "password not valid" });
        }

        if (req.body.verifyhandler && (req.body.verifyhandler === "email" || req.body.verifyhandler === "phone"|| req.body.verifyhandler ==="none")) {
            verifyhandler = req.body.verifyhandler;
        }

        if (CheckPhoneNumber(req.body.phoneNumber)) {
            phoneNumber = (req.body.phoneNumber).replace("+", "").trim();
        }

        const hashpassword = await bcrypt.hash(password, 10);

        if (email) {
            const user = await findUserwithEmail(email);
            if (user) {
                return res.json({ status: "user already exist with that email" });
            } else {
                // if (verifyhandler === "email") {
                //     const VerificationToken = crypto.randomBytes(32).toString("hex");
                //     const VerificationTokenExpiryTime = 3600;

                //     await client.setEx(VerificationToken, VerificationTokenExpiryTime, JSON.stringify({ name: name, email: email, password: hashpassword }));
                //     const VerificationOptions = RegisterVerificationOptions(path.join(".", "src", "template", "Verification", "verify.html"), `http://localhost:5000/api/auth/register/verify?token=${VerificationToken}`, email);

                //     logger.info(`sended verification token to: ${email}`);
                //     res.json({
                //         status: "temp user created. Redirect to verify",
                //         verificationtoken: VerificationToken,
                //         redirectURL: `http://localhost:5000/api/auth/register/verify?token=${VerificationToken}`
                //     });
                //     await sendmail(VerificationOptions);
                //     return;

                // }

                // if (verifyhandler === "phone") {
                //     const sessionID = uuidv4();
                //     const sessionIDExpiryTime = 60 * 10; // 10 min
                //     console.log("Ds")
                //     await client.setEx(sessionID, sessionIDExpiryTime, JSON.stringify({ name: name, phonenumber: phoneNumber, email: email, password: hashpassword }));
                //     // Add logic to send verification SMS here
                // }

                if(verifyhandler==="none"){

                    const user = await createUserWithEmailandPassword(name,email,hashpassword)
                    const token = generateAuthToken({id:user.id,email:user.email})
                    
                    if(user){
                        
                        const userdata = await creteUserData(user.id,"sdkjasjaodihoaisdoiasdaosind")
                        res.status(200).json({status:"success user created",authToken:token,userdata:userdata})
                    }

                }
            }
        } else {
            return res.json({ status: "NO email sent" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", message: error.message });
    }
};

const VerifyCreateUserWithPhone = async(req,res)=>{
    const sessionid = req.query.sessionid

}

const VerifyCreateUser =async(req,res) =>{
    const verificationtoken = req.query.token
    console.log(verificationtoken)
    try {
        const use  = await client.get(verificationtoken)
        const userdata = JSON.parse(use)
        console.log(userdata)
        const user = await createUserWithEmailandPassword(userdata.name,userdata.email,userdata.hashpassword)
        const token = generateAuthToken({id:user.id,email:user.email})
        
        if(user){
            client.del(verificationtoken)
        }

        res.status(200).json({status:"success user created",authToken:token})
        
    } catch (error) {
        console.log(error)
    }

   
}

const testCreateuser =async(req,res)=>{
    const email = req.body.email
    const name = "Dsdasds"
    const hashpassword ="sdasasdasdasdasd"
    const user = await createUserWithEmailandPassword(name,email,hashpassword)
    logger.info(`create user with email:${email}`)
    res.status(200).json(user)
}




const GenerateAccessTokenForOauth2 = async(req,res)=>{

    const user = req.user

    const token = generateAuthToken({id:user.id,email:user.email})
    res.cookie('authtoken', token, {
        maxAge: 3600000, // 1 hour in milliseconds
        httpOnly: true,  // Cookie is accessible only by the web server
        secure: false,   // Set to true if using HTTPS
        sameSite: 'lax',
        path:"/" 
        // Controls whether the cookie is sent with cross-site requests
      });
    res.redirect(`http://localhost:5173/app/`)
}

//login

const LoginWithEmailAndPassword = async(req,res) =>{

    const email = req.body.email
    const pass  = req.body.password

    console.log(email,pass)

    const user = await prisma.user.findUnique({where:{email}})
    
    
    if(user && bcrypt.compare(pass,user.password)){

        const authtoken = generateAuthToken({id:user.id,email:user.email})
        res.cookie('authtoken', authtoken, {
            maxAge: 3600000, // 1 hour in milliseconds
            httpOnly: true,  // Cookie is accessible only by the web server
            secure: false,   // Set to true if using HTTPS
            sameSite: 'lax',
            path:"/" 
            // Controls whether the cookie is sent with cross-site requests
          });

        res.status(200).json({
            status:"login succesfull",
            authToken:authtoken
        })

}else{
    res.status(400).json({
        status:"email or password not found"
    })
}

}

const forgotPasswordRestLink =async(req,res)=>{
    try{

        const generateToken = promisify(crypto.randomBytes)
        const buffer  = await generateToken(20);
        const token = buffer.toString("hex")

        console.log(req.body)

        if(!req.body.email){
            console.log("no email sent")
            return
        }

        const user = await findUserwithEmail(req.body.email)
        if(!user){
            
            return;
        }
        const originalDate = new Date();
        originalDate.setHours(originalDate.getHours() + 1);
        const updatedDate = new Date(originalDate);
        const use = await updateUserRestToken(token,updatedDate,req.body.email)

        const options = await GetGmailOptions(path.join(".","src","template","Mail","Mail.html"),token,user.email) 
        console.log(user)
        await sendmail(options)


        console.log("sended Email Succesfully")
        
        res.status(200).json({status:"scuess"})

        


    }catch(error){
        console.log(error)
    }
}

const loginwithFaceBook = async()=>{

}

const loginwithX = async()=>{

}

module.exports = {testCreateuser,VerifyCreateUser,GenerateAccessTokenForOauth2,CreateUser,LoginWithEmailAndPassword,loginwithFaceBook,loginwithX,forgotPasswordRestLink}