const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
// this is a userSchema of user Collection
let userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    }
})
userSchema.pre('save',async function (next) {
    let user=this;
    if(!user.isModified('password')){
        return next()
    }
    try {
        let salt=await bcrypt.genSalt(10)

        // password hash
        let hashpassowrd=await bcrypt.hash(user.password,salt)

        user.password=hashpassowrd
        
        next()
    } catch (error) {
        return next(error)
    }
})
userSchema.methods.comparePassword=async function(candidatePass){
    try {
        let isMatch=await bcrypt.compare(candidatePass,this.password)
        return isMatch
    } catch (error) {
        throw error
    }

}
let user=mongoose.model('user',userSchema)

module.exports={
    user,
}