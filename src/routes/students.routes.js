const { Router } = require("express");
const {
  renderStudentsForm,
  createStudents,
  renderStudents,
  renderEditStudents,
  updateStudents,
  deleteStudents,
} = require("../controller/students.controller");
const {isAuthenticated} = require('../helpers/auth')
const router = Router();

//new nrestaurant
router.get("/student/add",isAuthenticated, renderStudentsForm);
router.post("/student/new-student",isAuthenticated, createStudents);

//all restaurants
router.get("/student",isAuthenticated, renderStudents);

//edit restaurants
router.get("/student/edit/:id",isAuthenticated, renderEditStudents);
router.put("/student/edit-student/:id",isAuthenticated, updateStudents);

//delete restaurants
router.delete("/student/delete/:id",isAuthenticated, deleteStudents);

module.exports = router;
