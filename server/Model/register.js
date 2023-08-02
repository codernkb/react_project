const mongoose = require('mongoose');
///////define schema///////////////
const registerSchema = new mongoose.Schema({
  name:{type:String,require:true},
  email: {type:String,require:true},
  mobile:{type:String,require:true},
  password: {type:String,require:true},
  conpassword:{type:String,require:true},
  address:{type:String,require:true},
  isDeleted: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

////////create model////////////
const Register=mongoose.model("Registers",registerSchema)
module.exports=Register