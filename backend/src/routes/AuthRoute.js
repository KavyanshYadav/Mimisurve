const express = require('express');
const { forgotPasswordRestLink, LoginWithEmailAndPassword, CreateUser, GenerateAccessTokenForOauth2, VerifyCreateUser, testCreateuser } = require('../controller/AuthController');
const { route } = require('./UserRoute');
const router = express.Router();
const passport = require('passport');
const { AuthorzieUser } = require('../middleware/AuthorizationMiddleware');
const { loginRateLimiter } = require('../middleware/RateLimiterMiddleare');

/**
 * @swagger
 * /getauthtoken:
 *   post:
 *     summary: Login / Retrieve authtoken from server
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mySecurePassword123
 *     responses:
 *       200:
 *         description: authToken
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authtoken: 
 *                     type: string
 */
router.post("/login",loginRateLimiter,LoginWithEmailAndPassword)

router.post("/verify",AuthorzieUser,(req,res)=>{
  res.json({status:"Access Token is verified",verified:true})
})

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
 GenerateAccessTokenForOauth2
);
router.get('/github', passport.authenticate('github', { scope: ['profile', 'email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
 GenerateAccessTokenForOauth2
);

router.get("/register/verify",VerifyCreateUser)

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request a password reset link
 *     description: Generates a password reset token and sends an email with the reset link to the user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       400:
 *         description: Bad request, missing email
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/reset/password',forgotPasswordRestLink)

router.post("/register/verify/phone",(req,res)=>{
  res.json({status:"service in production"})
})

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: kppasdpasd
 *               email:
 *                 type: string
 *                 example: kavyanshy66@gmail.com
 *               password:
 *                 type: string
 *                 example: pokemonz1$
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       '400':
 *         description: Bad request, invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid input data
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An unexpected error occurred
 */
router.post("/register",CreateUser)

router.post("/register/test",testCreateuser)


module.exports = router;