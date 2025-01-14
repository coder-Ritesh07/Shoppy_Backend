const mongoose=require('mongoose')
const express=require('express');
const { productRouters } = require('./routes/Product');
const { cartRoute } = require('./routes/Cart');
const passport = require('passport');
const { user } = require('./models/User');
const { authRoute } = require('./routes/AuthRoute');
const LocalStrategy = require('passport-local').Strategy;


let app=express();
// create a connection to the MongoDB
mongoose.connect('mongodb://localhost:27017/shoppyGlobe')
let db=mongoose.connection
// check the connection of MongoDB
db.on("open",()=>{
    console.log("Connected Successfully")
})
db.on("error",()=>{
    console.log("Something went wrong on server")
})

// adding middleware
app.use((req,res,next)=>{
    console.log(req.method,req.url)
    next();
})
app.use(express.json())
app.use(express.urlencoded())

// create passport Authentication
passport.use(new LocalStrategy(async function(Username,Password,done) {
    try {
        console.log(Username,Password)
       let uservalidname= await user.findOne({username:Username})
       if(!uservalidname)
        {
         return done(null,false,{message:"Invalid UserName"})
        }
        let userpass=await uservalidname.comparePassword(Password)
        if(userpass)
            {
             return done(null,uservalidname)
            }else{
             return done(null,false,{message:"Incorrect Password"})
            }
    } catch (error) {
        return done(error)
    }
}))
app.use(passport.initialize());
let localAuthintication=passport.authenticate('local',{session:false})

app.get('/',(req,res)=>{
    res.json(`<p>WellCome To the Shoppy Globe Backend`)
})
// routes are here 
app.use(productRouters)
app.use(cartRoute)
app.use(authRoute)

// add a middle ware when any routes are not match then its show this messege
app.use((req,res,next)=>{
    res.status(404).json({error:"Page Not Found Enter Valid URL"})
})
// create a server using Express
let PORT=8000
app.listen(PORT,()=>{
    console.log(`Server Running on http://localhost:${PORT}`)
})