const User = require('../models/User');
const passport = require('passport');
const userCtrl = {};




userCtrl.renderSignUpForm = (req, res) => {
  res.render('signup');
};

userCtrl.signupPost = async (req, res) => {
  const errors = [];
  const { name, email,cedula,lastname, password,direccion,userType, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Passwords do not match." });
  }
  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
  }
  if (errors.length > 0) {
    res.render("signup", {
      errors,
      lastname,
      cedula,
      direccion,
      name,
      email,
      userType,
      password,
      confirm_password,
    });
  } else {
    // Look for email coincidence and cedula
    const emailUser = await User.findOne({ email: email });
    const cedulaUser = await User.findOne({cedula:cedula})
    if (emailUser) {
      req.flash("error_msg", "The Email is already in use.");
      res.redirect("/signup");
    } 
    if(cedulaUser) {
      req.flash("error_msg", "The Cedula is already exist.");
      res.redirect("/signup");
    }else {
      // Saving a New User
      const newUser = new User({name, email,cedula,lastname, password,direccion,userType:'normal', confirm_password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "You are registered.");
      res.redirect("/signin");
    }
  }
};


userCtrl.renderSigninForm = (req, res) => {
  res.render('signin');
};

userCtrl.signinPost = passport.authenticate("local", {
  successRedirect: "/student",
  failureRedirect: "/signin",
  failureFlash: true,
});

userCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out now.");
  res.redirect("/signin");
};

module.exports=userCtrl;
