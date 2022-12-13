const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },

  // select false so that it will not check all globally
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});


userSchema.pre("save",async function(next){
   
    if(!this.isModified("password"))  //this will check whether the password is modified or not otherwise
                                      //  it will modify on its own all the time
    {
        next();
    }

    this.password=await bcrypt.hash(this.password,10);

    // we are using anonyms function because we cannot use this in arrow functions
    //by using pre it becomes event and will run automatically before saving

})



//create individual methods 
// this user method will be applied to every user where we will call that function it will pick the id
userSchema.methods.getjwttoken=function(){
    return jwt.sign({id:this._id},process.env.jwt_secret,{
        expiresIn:process.env.jwt_expire
    });

}


//password comapare 
// what is this referring to here ->it is referring to the individual schema returned by find create or anything
userSchema.methods.comparePassword=function(password){
    //console.log("password:",password.toString()+"  "+"this->",this.password);
    password=password.toString();
    return bcrypt.compare(password,this.password);
}
module.exports=mongoose.model("user",userSchema);