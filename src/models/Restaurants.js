const {Schema,model}=require('mongoose');

const restaurantSchema= new Schema({
    name:{type:String,required:true},
    location:{type:String,required:true},
    speciality:{type:String,required:true},
    user:{type:String,required:true},
    score:{type:Number,required:false}
},{
    timestamps:true
});

module.exports=model('Restaurant',restaurantSchema);