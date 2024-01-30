import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
   email:{
    type:String,
    unique:[true, 'Email already exists!'],
    required:[true, 'Email is required']
   }, 
   username:{
    type:String,
    required:[true,'Username is required'],
    unique:[true, 'Username is already taken!'],
    match: [/^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
   } ,
   image:{
    type:String
   }
});

// if the model does not created it will create a new model else it will use the existing model as it runs for eaach sign in 
const User = models.User || model("User", UserSchema);

export default User;
