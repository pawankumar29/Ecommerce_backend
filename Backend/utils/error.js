
class Errorhandler {
    constructor(message,statusCode,fal){
      // super(message);
       this.message=message
        this.statuscode=statusCode;
        this.fal=fal
       


       // Error.captureStackTrace(this,this.constructor);
    }
}

module.exports=Errorhandler;