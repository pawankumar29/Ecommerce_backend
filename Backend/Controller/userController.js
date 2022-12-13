const Errorhander = require('../utils/error');
const catchAsyncError=require('../middleware/catchAsyncErrors');
const user=require('../Model/usermodel');
const sendToken=require('../utils/jwttoken').default;



exports.registerUser=catchAsyncError(async(req,res,next)=>{
     const{name,email,password}=req.body;

     const User=await user.create({
        name,email,password,avatar:{
            public_id:"sample",
            url:"/aaa"
        }
     })

     const token=await User.getjwttoken(); //this method is for User created so call it for User not for model



    //  res.status(200).json({status:1,message:"successful",token})
    sendToken(User,200,res);
})

//login User

exports.Login=catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;

    if(!email||!password){
      return next(new Errorhander("please enter email&password",400)); //400 bad request
    }

    //check user 

    const User=await user.findOne({email}).select("+password");// we are using select in password because 
                                                               // we have set it false to check in all records 
 
      if(!User){
        return next(new Errorhander("invalid email or password",400));
      }
    

      const isPasswordMatch=await User.comparePassword(Number(password));

      if(!isPasswordMatch){
        return next(new Errorhander("invalid email or password",401)); //401 unauthorized
      }

      const token=await User.getjwttoken(); // methods are for particular user not for model

      sendToken(User,200,res);

    //   res.status(200).json({status:1,message:"successful",token})
})


// Logout User
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()), // to expire the cookie on current time it will empty the cookie
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});