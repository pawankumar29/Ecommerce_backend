const express=require('express');
const Router=express.Router();
const {registerUser,Login, logout}=require('../Controller/userController.js');


Router.route('/user').post(registerUser);
Router.route('/login').get(Login);
Router.route('/logout').get(logout);


module.exports=Router;
