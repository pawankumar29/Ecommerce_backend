const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const Errorhander = require('../utils/error');
const user=require('../Model/usermodel');

const jwt=require('jsonwebtoken');

exports.isAuthenticated=catchAsyncErrors(async(req,res,next)=>{
     
    const {token}=req.cookie;

    //console.log(token);

    if(!token){
        return next(new Errorhander("User is not authorized kindly follow the procedure",404));

    }


    const decoded=jwt.verify(token,process.env.jwt_secret);

    req.user=await user.findById(decoded.id);

    next();





})