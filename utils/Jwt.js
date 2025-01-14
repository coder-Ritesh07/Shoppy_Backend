const jwt = require("jsonwebtoken");
require("dotenv").config();

// it is a secret key which is presrnt in .env file
let JWT_SECRET = process.env.JWT_SECRET;

// jwt verify middleware for checking purpose
function jwtAuthenticationMiddleware(req,res,next) {
  let authorization = req.headers.authorization;
//   check the authorization is correct or not
  if (!authorization) {
    return res.status(401).json({ messege: " Token not found" });
  }

  let token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ messege: "Unauthorized" });
  }
//   verify the tokens
  try {
    let decode=jwt.verify(token,JWT_SECRET)
    req.user=decode
    next()
  } catch (error) {
    res.status(404).json({messege:"Invalid Token"})
  }
}
// this method generate the token when a user login first time
function generateTokens(userdata)
{
    return jwt.sign({ userId: userdata.id, username: userdata.username },JWT_SECRET,{expiresIn:'24hr'})
}
// here we exports the module
module.exports={
    jwtAuthenticationMiddleware,
    generateTokens,
}