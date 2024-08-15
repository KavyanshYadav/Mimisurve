const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your-secret-key';


function generateSessionToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: '5h' }); // Token expires in 1 hour

}
function generateAuthToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: '1000h' }); // Token expires in 1 hour

}

function verifyToken(token) {
    try{

       const verify= jwt.verify(token, secretKey);
       return verify
    }catch(error){
        console.log("User Not verified")
        return false
    }
}

function DeloadPlayload(token){
    return jwt.decode(token)
}

module.exports = {
    generateAuthToken,
    generateSessionToken,
    verifyToken,
    DeloadPlayload
}