const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.mongo_uri);
const studenSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    studentId:Number,
   course:String,
    email:String,
        
    phone:Number,
   },{timestamps:true}
)
module.exports = mongoose.model("student",studenSchema);