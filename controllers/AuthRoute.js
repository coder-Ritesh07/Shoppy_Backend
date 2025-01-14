const express = require("express");
const { user } = require("../models/User");
const { generateTokens } = require("../utils/Jwt");

// here we handle register api route
const register=async(req,res)=>{
    try {
        let userInfo=new user(req.body)
        await userInfo.save()
        res.status(201).json({messege:"User Registered Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal Server Error"})
    }
}
//here we handle login api route
const login=async(req,res)=>{
  try {
    let {username,password}=req.body
    let users=await user.findOne({username:username})

    if(!users||!(await users.comparePassword(password)))
        {
            return res.status(401).json({message:"Invalid username or password"})
        }
     let payload={
        id:users.id,
        username:users.username
     }
    //  here we generate a token to call a generateToken method
     let tokens=generateTokens(payload)
     res.json({tokens})
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
  }
}

module.exports={
    register,
    login,
}