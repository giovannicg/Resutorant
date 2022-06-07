const { Router } = require("express");
const {renderAllUsers,deleteUser, renderEditUser,updateUser} = require('../controller/admin.controller');
const{isAuthenticated}=require('../helpers/auth');

const router = Router();

router.get('/admin',isAuthenticated, renderAllUsers);

router.get("/admin/edit/:id",isAuthenticated,renderEditUser);
router.put("/admin/edit-user/:id",isAuthenticated,updateUser);

router.delete("/admin/delete/:id",isAuthenticated,deleteUser);

module.exports = router;