const User = require('../models/User');
const passport = require('passport');
const adminCtrl = {};



adminCtrl.renderAllUsers = async(req, res) => {
    //let email = req.query.email;
    let findAdmin = await User.findOne({email:"admin@localhost"}).lean();
    if(findAdmin){
        const users=await User.find({ user: req.user.id })
        .sort({ date: "desc" })
        .lean();
        res.render('admin_users',{users})
    }else{
        req.flash("success_msg", "Not Authorized");
        res.redirect("/signin");
    }
    
};
adminCtrl.renderEditUser=async (req,res)=>{
    let user = await User.findById(req.params.id).lean();
    /*if (user = req.user.id) {
      req.flash("error_msg", "Not Authorized");
      return res.redirect("/admin");
    }*/
    res.render('edit_user',{user});
}

adminCtrl.updateUser=async(req,res)=>{
   const {name,lastname,email,cedula,direccion} = req.body;
   await User.findByIdAndUpdate(req.params.id,{name,lastname,email,cedula,direccion})
   req.flash("success_msg", "User Updated Successfully");
   res.redirect("/admin");
}
adminCtrl.deleteUser=async (req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "student Deleted Successfully");
    res.redirect("/admin");
}


module.exports=adminCtrl;

