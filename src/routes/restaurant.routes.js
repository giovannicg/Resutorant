const { Router } = require("express");
const {
  renderRestaurantForm,
  createRestaurant,
  renderRestaurants,
  renderRestaurantsbyUser,
  renderEditRestaurant,
  updateRestaurant,
  deleteRestaurant,
  filter,
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

//delete restaurants
router.delete("/restaurant/delete/:id",isAuthenticated, deleteRestaurant);

module.exports = router;