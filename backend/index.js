const express = require('express');
const https = require('https');
const dotenv = require('dotenv');
const UserRouter = require('./src/routes/UserRoute');
const prisma = require('./src/models/PrismaClient');
const AuthRouter = require('./src/routes/AuthRoute');
const morgan = require('morgan');
const promBundle = require('express-prom-bundle');
const swaggerUi = require('swagger-ui-express');
const { SwaggerInitialize } = require('./src/services/SwagerDocs');
const session = require('express-session');
const passport = require('passport');
const { passportGoogleinit, Githubinit } = require('./src/config/passport');
const { globalRateLimter } = require('./src/middleware/RateLimiterMiddleare');
const { client } = require('./src/config/redis');
const fs = require("fs");
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express()
const RedisClient = client

app.use(morgan('combined'));
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend domain
  credentials: true
}));
app.use(cookieParser());
// app.use(globalRateLimter)

passportGoogleinit()
Githubinit()
app.use(session({ secret: 'jdnadnasdoi', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const metricsMiddleware = promBundle({
  includeMethod: true, 
  includePath: true, 
  includeStatusCode: true, 
  includeUp: true,
  customLabels: {project_name: 'hello_world', project_type: 'example'},
  promClient: {
      collectDefaultMetrics: {
      }
    }
});
async function ma(){
    await prisma.$connect()
    console.log("prisma connected to mongodb")
}
ma()


app.use(metricsMiddleware)

app.get("/",(req,res)=>{
    res.json({name:"heelo"})
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(SwaggerInitialize()));
app.use("/api/user",UserRouter)
app.use("/api/auth",AuthRouter)

console.log(app._routerm)
const PORT = process.env.PORT || 5000;

// const options = {
//   key: fs.readFileSync(path.join(__dirname, './server.key')),
//   cert: fs.readFileSync(path.join(__dirname, './server.cert'))
// };



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// https.createServer(options, app).listen(PORT, () => {
//   console.log(`HTTPS server is running on ${PORT}`);
// });