const Restaurant = require('../models/Restaurants');
const Ratings = require('../models/Ratings');
const restaurantsCtrl = {};

restaurantsCtrl.renderRestaurantForm=(req,res)=>{
    res.render('restaurants/new_restaurant')
};
restaurantsCtrl.renderRestaurants = async (req, res) => {
    const restaurants = await Restaurant.find()
    .sort({ date: "desc" })
    .lean();
    res.render('restaurants/restaurants', { restaurants });
};

restaurantsCtrl.createRestaurant= async (req,res)=>{
  const { name,location,speciality } = req.body;
  const errors = [];
  if (!name) {
    errors.push({ text: "Please Write a name." });
  }
  if (!speciality) {
    errors.push({ text: "Please Write a speciality" });
  }
  if (!location) {
    errors.push({ text: "Please Write a location" });
  }
  if (errors.length > 0) {
    res.render("restaurant/new_restaurant", {
      errors,
      name,
      location,
      speciality
    });
  } else {
    const newRestaurant = new Restaurant({ name,location,speciality});
    newRestaurant.user = req.user.id;
    await newRestaurant.save();
    req.flash("success_msg", "Restaurant Added Successfully");
    res.redirect("/restaurant/myRestaurants");
  }
    
};

restaurantsCtrl.renderRestaurantsbyUser=async (req,res)=>{
    const restaurants=await Restaurant.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
    res.render('restaurants/all_restaurants',{restaurants})
}

restaurantsCtrl.renderEditRestaurant=async (req,res)=>{
    const restaurant = await Restaurant.findById(req.params.id).lean();
    if (restaurant.user != req.user.id) {
      req.flash("error_msg", "Not Authorized");
      return res.redirect("/restaurant/myRestaurants");
    }
    res.render('restaurants/edit_restaurant',{restaurant});
}

restaurantsCtrl.renderRatings = async (req, res) => {
  const restaurant=await Restaurant.findById(req.params.id).lean();
  res.render('restaurants/ratings', { restaurant });
};

restaurantsCtrl.renderNewRatings = async (req, res) => {
    const { score } = req.body;
    const errors = [];
    if (!score) {
      errors.push({ text: "Please Write a score." });
    }
    if (errors.length > 0) {
      res.redirect("restaurant/")
    } else {
      const newRatings = new Ratings({score});
      newRatings.user = req.user.id;
      newRatings.restaurant = req.restaurant.id;
      await newRatings.save();

      req.flash("success_msg", "Restaurant Rating Successfully");
      res.redirect("restaurant/");
    }
};

restaurantsCtrl.updateRestaurant=async(req,res)=>{
   const { name,location,speciality } = req.body;
   await Restaurant.findByIdAndUpdate(req.params.id,{ name,location,speciality})
   req.flash("success_msg", "Restaurant Updated Successfully");
   res.redirect("/restaurant/myRestaurants");
}
restaurantsCtrl.deleteRestaurant=async (req,res)=>{
    await Restaurant.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Restaurant Deleted Successfully");
    res.redirect("/restaurant/myRestaurants");
}
module.exports=restaurantsCtrl;