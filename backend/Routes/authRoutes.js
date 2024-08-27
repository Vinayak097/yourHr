import e from "express";
import multer from "multer";
import User from "../model/userModel.js";
import jwt from 'jsonwebtoken'
const router=e.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb){
      cb(null, "./files");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix+ file.originalname);
    },
  });

const upload = multer({ storage: storage });


router.post('/signup',upload.single("file"),async (req,res)=>{
    const {fullname,password,email}=req.body;

    try{
        const token= await jwt.sign({email}, process.env.JWT_SCRET);

        if(!req.file.filename){
            return res.status(400).json({message:"file not recived send pdf only"})
        }
        const user =new User({
            email,
            fullname,
            password,
            resume:req.file.filename
        })
        await user.save();
        return res.status(201).json({message:"account created",token:token})

    }catch(e){
        console.log("error in signup", e.message);
        return res.status(500).json("Internal server Error");
    }
    
})

router.post('/login',(req,res)=>{
    res.send('login route')
})


export default router;

