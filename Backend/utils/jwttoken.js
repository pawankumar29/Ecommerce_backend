// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getjwttoken();
  
    // options for cookie
    const options = {
      expiresIn: new Date(
        Date.now() + process.env.Cookie_Expire * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  };
  
module.exports=sendToken;