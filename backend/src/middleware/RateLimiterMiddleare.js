const { default: rateLimit } = require("express-rate-limit");



const CustomHandler =(req,res,next,options)=>{
    res.status(options.statusCode).json({
        status:"Blocked",
        message:"you have exceeded the limit of request. Try again after some time"
    })
}

const globalRateLimter = rateLimit({
    windowMs:1*60*1000,
    max: 200, // Limit each IP to 5 login requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes' ,
    handler: CustomHandler
})


const loginRateLimiter = rateLimit({
    windowMs:10*60*1000,
    max: 5, // Limit each IP to 5 login requests per windowMs
    message: 'Too many login attempts from this IP, please try again after 15 minutes' ,
    handler: CustomHandler
})
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per windowMs
    handler: CustomHandler
  });


module.exports = {loginRateLimiter,apiLimiter,globalRateLimter}