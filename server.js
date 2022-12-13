const app=require('./app');
const dotenv=require('dotenv');
dotenv.config({path:'./Backend/config.env'});
require('./Backend/config/databaseConnection');




app.listen(process.env.Port,()=>{
     console.log(`app is running on the port ${process.env.Port}`)
})