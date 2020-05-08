const mongoose = require('mongoose');
//movies schema
let movieSchema = mongoose.Schema({
  title:{type:String, required:true},
  director: { name:{type:String,required:true, default:'uknown'},
              bio:String,
              birth:Date,
              death:Date
            },
  year:String,
  language:[String],
  description:String,
  genre:{name:{type:String,required:true}, description:String},
  featured:Boolean
})

  let userSchema= mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true, unique: true},
    birthday:{type:Date,required:true},
    favourites:[{type:mongoose.Types.ObjectId, ref:'Movie'}]
  })
  
  //define models
let movieModel= mongoose.model('Movie',movieSchema);
let userModel = mongoose.model('User',userSchema);

module.exports={movieModel,userModel};
  
  