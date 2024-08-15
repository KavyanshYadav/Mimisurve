const { default: xss } = require("xss")


const SanitizeData = (data)=>{
    return(xss(data))
}

module.exports ={SanitizeData}