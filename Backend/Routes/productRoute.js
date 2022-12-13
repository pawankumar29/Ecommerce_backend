const express=require('express');
const Router=express.Router();
const product=require('../Controller/productController');
const obj=new product();
const isAuthenticated=require('../middleware/auth');


Router.route('/product/new').post(obj.createProduct);
Router.route('/products').get(obj.getAllProducts);
Router.route('/del/:id').delete(obj.deleteProduct);
Router.route('/update/:id').put(obj.updateProduct);
Router.route('/search').get(obj.searchProduct);


module.exports=Router;