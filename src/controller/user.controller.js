const User = require('../models/User');
const passport = require('passport');
const userCtrl = {};

userCtrl.renderSignUpForm = (req, res) => {
  res.render('signup');
};

userCtrl.signupPost = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password,userType } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Passwords do not match." });
  }
  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
  }
  if (errors.length > 0) {
    res.render("signup", {
      errors,
      userType,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "The Email is already in use.");
      res.redirect("/signup");
    } else {
      // Saving a New User
      const newUser = new User({ name, email, password,userType });
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
  successRedirect: "/restaurant",
  failureRedirect: "/signin",
  failureFlash: true,
});

userCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out now.");
  res.redirect("/signin");
};

module.exports=userCtrl;
