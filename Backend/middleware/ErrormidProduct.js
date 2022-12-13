const Errorhander=require('../utils/error');

module.exports=(err,req,res,next)=>{
   

    err.statusCode=err.statuscode||500;
    err.message=err.message||"internal server Error";
    
    res.status(err.statusCode).json({
        success:false,
       Message:err.message,
      
    })

}