import mongoose, { model } from "mongoose";

const userSchema=new mongoose({
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
        type:File,
        require:true
    }        
})

const User = new model(userSchema,'User')
export default User;