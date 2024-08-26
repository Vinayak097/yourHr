import e from "express";
import multer from "multer";


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"./uploads");
    },
    filename:function(req,file,cb){
        return cb(null,`${req.user.email}-${file.originalname}`);
    }
})
const router=e.Router();
router.post('/signup',(req,res)=>{
    res.send('signup route')
})

export default router;

