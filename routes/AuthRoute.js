const express = require("express");
const { register, login } = require("../controllers/AuthRoute");
let authRoute = express.Router();

// here the register and login api routes
authRoute.post('/register',register)
authRoute.post('/login',login)

module.exports={
    authRoute
}