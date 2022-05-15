const authCtrl = {};

authCtrl.isAuthenticated  =(req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Not Authorized.");
    res.redirect("/signin");
};

/*authCtrl.authPage = (permissions)=>{
  return(req, res, next)=>{
    const userRole = req.body.userType;
    if(permissions.includes(userRole)){
      next();
    }else{
      req.flash("error_msg", "Not Authorized.");
      res.redirect("/signin");
    }
  }
}*/

module.exports=authCtrl;

