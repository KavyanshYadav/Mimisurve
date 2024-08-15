const bcrypt = require("bcryptjs/dist/bcrypt")
const prisma = require("../models/PrismaClient")
const { createUserWithEmailandPassword, findUserwithEmail } = require("../services/UserService")
const { generateAuthToken, DeloadPlayload } = require("../services/jwt")


const getUserInformation =async(req,res)=>{
    try{
        const playload = DeloadPlayload(req.cookies.authtoken)
        const user  = await findUserwithEmail(email=playload.email)
        console.log(user)
        res.status(200).json({
            email:user.email,
            displayName:user.displayName,
            

        })
    }catch(error){
        console.log(error)
    }
}




module.exports = {getUserInformation}