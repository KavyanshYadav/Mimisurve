const { verifyToken } = require("../services/jwt")

const AuthorzieUser= async(req,res,next)=>{
    console.log(req.cookies.authtoken)
    if (req.cookies.authtoken){
        try{
            
            const token  = verifyToken(req.cookies.authtoken)
            if(token){
                console.log("verified")
                next()

            }else{
                res.status(401).json({status:"Request Not authorized",verified:false})
            }

        }catch(err){
            console.log(err)
        }
    }
    else{
        res.json({
            status:"Authorized Token missing",
            redirectUrl:"",
            verified:false,
        })
    }

}

module.exports = {AuthorzieUser}