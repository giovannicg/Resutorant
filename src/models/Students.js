const {Schema,model}=require('mongoose');

const estudaintesSchema= new Schema({
    name:{type:String,required:true},
    lastname: { type: String, required: true},
    age:{type:String,required:true},
    level:{type:String,required:true},
    user:{type:String,required:true},
},{
    timestamps:true
});

module.exports=model('Estudiantes',estudaintesSchema);