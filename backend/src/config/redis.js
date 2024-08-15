const { createClient } = require('redis');
const { error } = require('winston');





const client = createClient({
        password: process.env.REDIS_PASSWORD,
        socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        }
    });

    client.connect().catch((error)=>{
        console.log(error)
        
    })

    client.on("connect",(e)=>{
        console.log("connected to reddis")
    })




module.exports = {client}