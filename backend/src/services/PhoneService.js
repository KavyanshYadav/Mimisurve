const twilio = require('twilio');


const accountSid = process.env.ACCOUNT_SSID;
const authToken = process.env.AUTHTOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONENUMBER;

const TwilioClient = twilio(process.env.ACCOUNT_SSID, process.env.AUTHTOKEN);

try{
    (async()=>{

        await TwilioClient.messages.create({
            body:"otp",
            from:"",
            to:""
        })

    })()
}catch(error){
    console.log(error)
}
