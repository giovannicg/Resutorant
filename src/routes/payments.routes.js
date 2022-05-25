const { Router } = require("express");
const {isAuthenticated} = require('../helpers/auth')
const router = Router();

//new nrestaurant
router.get("/payments/add",isAuthenticated, renderStudentsForm);
router.post("/payments/new-payment",isAuthenticated, createStudents);

//all restaurants
router.get("/payments",isAuthenticated, renderStudents);


module.exports = router;
