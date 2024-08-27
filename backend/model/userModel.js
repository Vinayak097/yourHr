import mongoose, { model } from "mongoose";

const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },
    email:{
        type :String,
        requiret:true
    },
    password:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    resume:{
        type:String,
        require:true
    }        
})

const User = new model('User',userSchema)
export default User;