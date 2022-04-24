const { Router } = require("express");
const {  renderSignUpForm,
    signupPost,
    renderSigninForm,
    signinPost,
    allUsers,
    logout,
} = require('../controller/user.controller');
const isAuthenticated = require('../helpers/auth');

const router = Router();

// Routes
router.get('/signup', renderSignUpForm);

router.post("/signup", signupPost);

router.get('/signin', renderSigninForm);

router.post("/signin", signinPost);

router.get('/logout', logout);

router.get('/users',isAuthenticated,allUsers);

module.exports = router;