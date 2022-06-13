const {Schema,model}=require('mongoose');

const ratingSchema= new Schema({
    restaurant:{type:String,required:true},
    user:{type:String,required:true},
    score:{type:String,required:true},
    date: { type: Date, default: Date.now },
},{
    timestamps:true
});

module.exports=model('Ratings',ratingSchema);