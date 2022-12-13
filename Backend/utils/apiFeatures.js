const Product=require('../Model/productModel')


class apiFeatures{

     constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
     }


     //for searching the products through the pattern
     search(){
        const keyword=this.queryStr.keyword?
        {   name:{
           $regex:this.queryStr.keyword,
           $options:"i"
        }

        
          

        }:{};
       

        this.query=this.query.find({...keyword});

        return this;        
     }

     //to search for particular category only
      filter() {
         const queryCopy = { ...this.queryStr };
         //   Removing some fields for category
         const removeFields = ["keyword", "page", "limit"];
     
         removeFields.forEach((key) => delete queryCopy[key]); //for deleting the object 
           

         //filter for the price Range
         let queryStr=JSON.stringify(queryCopy); //converting in strings


      //this is for adding dollar replace is a method in which you can replace all the words for more information 
      //check replace method 

         queryStr=queryStr.replace(/(gt|gte|lt|lte)/g,(key)=>`$${key}`);
          console.log("queryStrApi->",queryStr);
         this.query=this.query.find(JSON.parse(queryStr));// converting in objects






         // this.query=this.query.find(queryCopy);

         return this;
     }

     pagination(limitperPage){
      const currentPage=Number(this.queryStr.page)||1;

      const skip=limitperPage*(currentPage-1);

      this.query=this.query.limit(limitperPage).skip(skip);

      return this;

     }



}

module.exports=apiFeatures;