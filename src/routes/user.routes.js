const { Router } = require("express");
const {  renderSignUpForm,
    signupPost,
    renderSigninForm,
    signinPost,
    logout,
} = require('../controller/user.controller');

const router = Router();

// Routes

//signup users
router.get('/signup', renderSignUpForm);
router.post("/signup", signupPost);

//signion users
router.get('/signin', renderSigninForm);
router.post("/signin", signinPost);

//logout session
router.get('/logout', logout);




module.exports = router;