const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const errormiddleware=require('./Backend/middleware/ErrormidProduct');

const product=require('./Backend/Routes/productRoute');
const user=require('./Backend/Routes/userRoute');
app.use(express.json());
app.use(cookieParser);

app.use('/api/v1',product);

app.use('/api/v1',user);

app.use(errormiddleware);

module.exports=app;