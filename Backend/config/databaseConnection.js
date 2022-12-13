const mongoose =require('mongoose');


const connectDatabase=()=>{
    console.log(process.env.Port);
mongoose.connect(process.env.DB_Url).then(()=>{
     console.log(`mongoose connected Successfully ${process.env.Port}`);
}).catch((err)=>{
    console.log("Error--->",err.message);
});
    //no catch unhandles so we will handle it with code below for unhandles promise rejection

}

//unhandled promise rejection






module.exports=connectDatabase();