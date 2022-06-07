const { Router } = require("express");
const{ renderpaymentsForm,createpayments,renderpayments,deletepayments} = require('../controller/payments.controller');
const {isAuthenticated} = require('../helpers/auth')
const router = Router();

//new nrestaurant
router.get("/payments/add",isAuthenticated, renderpaymentsForm);
router.post("payments/new-payment",isAuthenticated, createpayments);

//all restaurants
router.get("/payments",isAuthenticated, renderpayments);

router.delete("payments/:id",isAuthenticated, deletepayments); 


module.exports = router;
