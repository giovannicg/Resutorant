const Payments = require('../models/Payment');
const paymentsCtrl = {};


paymentsCtrl.renderpaymentsForm=(req,res)=>{
    res.render('students/new_payment')
};

paymentsCtrl.createpayments= async (req,res)=>{
  const errors = [];
  const {  estudiantes,cost,paymentType } = req.body;
  if (!estudiantes) {
    errors.push({ text: "Please Write a name." });
  }
  if (!cost) {
    errors.push({ text: "Please Write a Cost" });
  }
  if (!paymentType) {
    errors.push({ text: "Please Choose  a Type of Payment" });
  }
  if (errors.length > 0) {
    res.render("students/new_payment", {
      errors,
      estudiantes,
      cost,
      paymentType,
    });
  } else {
    const newPayment = new Payments({ estudiantes,cost,age,paymentType});
    newPayment.estudiantes = req.estudiantes.id;
    newPayment.user = req.user.id;  
    await newPayment.save();
    req.flash("success_msg", "Student Added Successfully");
    res.redirect("/payments");
  }
    
};

paymentsCtrl.renderpayments=async (req,res)=>{
    const payments=await Payments.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
    res.render('students/payments',{payments})
}


paymentsCtrl.deletepayments=async (req,res)=>{
    await Payments.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "student Deleted Successfully");
    res.redirect("payments");
}

module.exports=paymentsCtrl;