const Product=require('../Model/productModel');
const Errorhander = require('../utils/error');
const catchAsyncError=require('../middleware/catchAsyncErrors');
const apiFeatures = require('../utils/apiFeatures');

class product{

  //create a product

  createProduct=catchAsyncError(async(req,res,next)=>{
           
    const createprod=await Product.create(req.body);

    res.status(201).json({success:true,createprod});
  });

  getAllProducts=async(req,res,next)=>{
      const products=await Product.find();

      if(products.length==0){
       return next(new Errorhander("Product not Found",404,"fal"));
         // return next(new Error("hello",404));
       
      }

      res.status(200).json({status:1,products});
      
  }

  deleteProduct=catchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);

    if(!product)  return next(new Errorhander("product not found",404));

    await product.remove();

    res.status(200).json({status:1,msg:"successfully deleted"});
  })

  updateProduct=catchAsyncError(async(req,res,next)=>{

    const product=await Product.findById(req.params.id);

    if(!product)  return next(new Errorhander("product not found",404));

    const result=await Product.findOneAndUpdate({_id:req.params.id},req.body);

    res.status(200).json({status:1,msg:"successfully updated",result});


          
  })

  searchProduct=catchAsyncError(async(req,res,next)=>{
      
     const limit=req.query.limit||10;
      const productCount=await Product.countDocuments();
       const api=new apiFeatures(Product.find(),req.query).search().filter().pagination(limit);
       
       const products= await api.query;

    

       if(!products)return next(new Errorhander("product not found",404));
    
       res.status(200).json({status:1,msg:"successful",products,productCount});
  })





}

module.exports=product;