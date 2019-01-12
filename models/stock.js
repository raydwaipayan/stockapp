const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const StockSchema=new Schema({
  ticker:{
    type:String,
    required:true
  },
  priceHistory:{
    type:Array,
    default: [],
    required:false
  },
  column_names:{
    type:Array,
    default:[],
    required:false
  },
  createdDate:{
    type:Date,
    default: Date.now(),
    required:false
  }
});
module.exports=Stock=mongoose.model("stock", StockSchema);
