const { Router } = require("express");
const {  renderSignUpForm,
    signupPost,
    renderSigninForm,
    signinPost,
    logout,
} = require('../controller/user.controller');

const router = Router();

// Routes
router.get('/signup', renderSignUpForm);

router.post("/signup", signupPost);

router.get('/signin', renderSigninForm);

router.post("/signin", signinPost);

router.get('/logout', logout);


module.exports = router;