const {Schema,model}=require('mongoose');

const paymentSchema= new Schema({
    estudiantes:{type:String,required:true},
    cost:{type:String,required:true},
    paymentType:{type:String,required:true},
    user:{type:String,required:true},
    date: { type: Date, default: Date.now },
},{
    timestamps:true
});

module.exports=model('Payments',paymentSchema);