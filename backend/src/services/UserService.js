const { ObjectId } = require("mongodb")
const prisma = require("../models/PrismaClient")
const logger = require("./LoggerService")

const creteUserData = async(userid,surveyListid)=>{
    const userdata = await prisma.userData.create({
        data:{
            id:userid,
            userid:userid,
            surveyList:new ObjectId().toHexString()
        }
    })
    return userdata

}
const updateUserData = async(surveyListid,update) =>{
    const userdata = await prisma.userData.update({
        where:{
            id:surveyListid
        },data:update
    })
    
}

const getUserData = async(userid) =>{
    const userdata = await prisma.userData.findUnique({
        where:{
            id:userid
        }
    })
}

const createSurvey = async(surveyListid) =>{
    const survey = await prisma.surveyObject.create({
        data:{
            id: new ObjectId().toHexString(),
            surveyListid:surveyListid,
            lastUpdateByServer: new Date().getTime()
        }
    })
}

const createSurveyQuestion = async(surveyObjectid)=>{
    const surveyObject = await prisma.surveyObjectObject.create({
        data:{
            id: new ObjectId().toHexString(),
            type:"Input",
            options:[{data:"nameme",data:"adnasodas"}]
        }
    })
}

const  createUserWithEmailandPassword = async(name,email,hashpassword,accessToken=null) =>{

    const user = await prisma.user.create({
        data:{
            email:email,
            emailVerified:false,
            password:hashpassword,
            displayName:name,
            firstName:name,
            lastName:name,
            provider:"Native",
            accessToken:accessToken,
            refreshToken:""

        }
    })
    logger.info(`succesfully created user with Email and Password`)


    return user
}


const findUserwithEmail= async(email)=>{
    const user = await prisma.user.findUnique({
        where:{
            email:email
        }
    })

    return user
}

const findUsersWithName = async(name) =>{
    const user = await prisma.user.findMany({
        where:{
            displayName:name
        },
        
    })
}

const CreateUserwithGoogle = async(accessToken, refreshToken, profile, done) =>{

 const user = await findUserwithEmail(profile._json.email)

 if(!user){
    await prisma.user.create({
        data:{
            email:profile._json.email,
            emailVerified:profile._json.email_verified,
            password:null,
            displayName:profile._json.name,
            firstName:profile._json.given_name,
            lastName:profile._json.family_name,
            provider:profile.provider,
            accessToken:accessToken,
            refreshToken:refreshToken

        }
    })
 }

    return done(null,profile)
}

const CreateUserwithGitHub = async(accessToken, refreshToken, profile, done) =>{

    // const user = await findUserwithEmail(profile._json.email)
    const user = false
   
    if(!user){
       await prisma.user.create({
           data:{
               email:" ",
               emailVerified:false,
               password:null,
               displayName:profile.username,
               firstName:profile.username,
               lastName:profile.username,
               provider:profile.provider,
               accessToken:accessToken,
               refreshToken:refreshToken
   
           }
       })
    }
   
       return done(null,profile)
   }
   


const forgotPasswordRest = () =>{

}


const updateUserRestToken=async(resettoken,expirytime,email)=>{

    const user = await prisma.user.update({
        where:{
            email:email
        },
        data:{
            resettoken:resettoken,
            resttokenexpirytime:expirytime
        }
    })

    return user
    
}


module.exports = {
    createUserWithEmailandPassword,
    CreateUserwithGoogle,
    findUsersWithName,
    findUserwithEmail,
    updateUserRestToken,
    CreateUserwithGitHub,
    creteUserData,
    updateUserData,
    getUserData
    
}