const User=require('../models/User');


const createAdminUser = async () => {
  const userFound = await User.findOne({ email: "admin@localhost" });

  if (userFound) return;

  const newUser = new User({
    name: "admin",
    email: "admin@localhost",
    userType: "admin"
  });

  newUser.password = await newUser.encryptPassword("adminpassword");

  const admin = await newUser.save();

  console.log("Admin user created", admin);
};

module.exports= createAdminUser;