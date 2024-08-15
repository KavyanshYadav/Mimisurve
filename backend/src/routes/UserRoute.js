const express = require('express');
const { CreateUser, getUserInformation } = require('../controller/UserController');
const router = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */


router.post("/register",()=>{})

router.get("/info",getUserInformation)

module.exports = router;