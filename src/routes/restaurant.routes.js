const { Router } = require("express");
const {
  renderRestaurantForm,
  createRestaurant,
  renderRestaurants,
  renderRestaurantsbyUser,
  renderEditRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getComments,
  filter,
  insertComments,
  obtenerCalificar,
  calificar,
  renderCalificar,
} = require("../controller/restaurant.controller");
const isAuthenticated = require('../helpers/auth')
const router = Router();

//new nrestaurant
router.get("/restaurant/add",isAuthenticated, renderRestaurantForm);
router.post("/restaurant/new-restaurant",isAuthenticated, createRestaurant);

//all restaurants
router.get("/restaurant/myRestaurants",isAuthenticated, renderRestaurantsbyUser);
router.get("/restaurant",isAuthenticated, renderRestaurants,filter);
router.post("/restaurant/filter",isAuthenticated, filter);

//edit restaurants
router.get("/restaurant/edit/:id",isAuthenticated, renderEditRestaurant);
router.put("/restaurant/edit-restaurant/:id",isAuthenticated, updateRestaurant);

//coment restaurants
router.get("/restaurant/comments/:id",isAuthenticated, getComments);
router.post("/restaurant/comments/",isAuthenticated, insertComments);

router.get("/restaurant/comentario",isAuthenticated, obtenerCalificar);
router.get("/restaurant/comentario/calificar/:id",isAuthenticated, renderCalificar);
router.put("/restaurant/comentario/calificarya/:id",isAuthenticated, calificar);
//delete restaurants
router.delete("/restaurant/delete/:id",isAuthenticated, deleteRestaurant);

module.exports = router;