const mongoose=require('mongoose');

const schema=new mongoose.Schema({
   
    name:{
        type:String,
        required:[true,"please enter the product Name"],
        trim:true
    },

    description:{
        type:String,
        required:[true,"please enter the product description"]
    },
    price:{
        type:Number,
        required:[true,"please enter the product Price"],
        maxLength:[8,"price cannot exceed more than eight characters"]
    },
    rating:{
        type:Number,
        default:0
    },

    images:[{
        public_id:{
            type:String,
            required:true

        },
        url:{
            type:String,
            required:true

        }
    }],

    category:{
        type:String,
        required:[true,"please enter product category"]
    },

    stock:{
        type:Number,
        required:[true,"please enter the product stock"],
        maxLength:[4,"stcok cannot exceed more than 4"],
        default:1

    },

    numOfReviews:{
        type:String,
        default:0
    },

    Reviews:[
        {
            name:{
                type:String,
                required:true
        },
        rating:{
            type:String,
            required:true
        },
        comment:{
            type:String,
            required:true

        }


    }
    ],

    createdAt:{
        type:Date,
        default:Date.now()
    }


});

module.exports=mongoose.model("product",schema);