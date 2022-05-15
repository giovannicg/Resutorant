const Students = require('../models/Students');
const studentsCtrl = {};


studentsCtrl.renderStudentsForm=(req,res)=>{
    res.render('students/new_student')
};

studentsCtrl.createStudents= async (req,res)=>{
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
    res.render("students/new_student", {
      errors,
      name,
      lastname,
      age,
      level,
    });
  } else {
    const newStudent = new Students({ name,lastname,age,level});
    newStudent.user = req.user.id;
    await newStudent.save();
    req.flash("success_msg", "Student Added Successfully");
    res.redirect("/student");
  }
    
};

studentsCtrl.renderStudents=async (req,res)=>{
    const students=await Students.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
    res.render('students/all_students',{students})
}

studentsCtrl.renderEditStudents=async (req,res)=>{
    const students = await Students.findById(req.params.id).lean();
    if (students.user != req.user.id) {
      req.flash("error_msg", "Not Authorized");
      return res.redirect("/student");
    }
    res.render('students/edit_student',{students});
}

studentsCtrl.updateStudents=async(req,res)=>{
   const {name,lastname,age,level} = req.body;
   await Students.findByIdAndUpdate(req.params.id,{name,lastname,age,level})
   req.flash("success_msg", "student Updated Successfully");
   res.redirect("/student");
}
studentsCtrl.deleteStudents=async (req,res)=>{
    await Students.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "student Deleted Successfully");
    res.redirect("/student");
}

module.exports=studentsCtrl;