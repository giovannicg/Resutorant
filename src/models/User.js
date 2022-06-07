const { Schema, model } =require('mongoose');
const bcrypt =require('bcryptjs');

const userSchema = new Schema(
  {
    name: { type: String, trim: true },
    lastname: { type: String, required: true},
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    cedula: { type: String, required: true},
    direccion: { type: String, required: true},
    userType:{type:String,required:true},
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports= model("User", userSchema);