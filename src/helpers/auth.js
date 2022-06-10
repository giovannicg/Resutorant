const  isAuthenticated  =(req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Not Authorized.");
    res.redirect("/signin");
};

module.exports = isAuthenticated ;

