const Payments = require('../models/Payment');
const paymentsCtrl = {};


paymentsCtrl.renderpaymentsForm=(req,res)=>{
    res.render('students/new_payment')
};

paymentsCtrl.createpayments= async (req,res)=>{
  const errors = [];
  const {  name,lastname,age,level } = req.body;
  if (!name) {
    errors.push({ text: "Please Write a name." });
  }
  if (!lastname) {
    errors.push({ text: "Please Write a lastname" });
  }
  if (!age) {
    errors.push({ text: "Please Write a age" });
  }
  if (!level) {
    errors.push({ text: "Please Write a level" });
  }
  if (errors.length > 0) {
    res.render("payments/new_student", {
      errors,
      name,
      lastname,
      age,
      level,
    });
  } else {
    const newStudent = new payments({ name,lastname,age,level});
    newStudent.user = req.user.id;
    await newStudent.save();
    req.flash("success_msg", "Student Added Successfully");
    res.redirect("/student");
  }
    
};

paymentsCtrl.renderpayments=async (req,res)=>{
    const payments=await payments.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
    res.render('students/payments',{payments})
}

paymentsCtrl.renderEditpayments=async (req,res)=>{
    const payments = await payments.findById(req.params.id).lean();
    if (payments.user != req.user.id) {
      req.flash("error_msg", "Not Authorized");
      return res.redirect("/student");
    }
    res.render('students/edit_student',{students});
}

paymentsCtrl.updatepayments=async(req,res)=>{
   const {name,lastname,age,level} = req.body;
   await payments.findByIdAndUpdate(req.params.id,{name,lastname,age,level})
   req.flash("success_msg", "student Updated Successfully");
   res.redirect("/student");
}
paymentsCtrl.deletepayments=async (req,res)=>{
    await payments.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "student Deleted Successfully");
    res.redirect("/student");
}

module.exports=paymentsCtrl;