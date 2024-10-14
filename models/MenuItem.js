const { type } = require('express/lib/response');
const mongoose=require('mongoose');

const menuItemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['Sweet','spicy','sour'],
        required:true
    },
    is_drink:{
       type:Boolean,
       default:false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
});
//comment added for testing purpose
const menuItem =mongoose.model('MenuItem',menuItemSchema);
module.exports= menuItem;