const Restaurant = require('../models/Restaurants');
const restaurantsCtrl = {};

restaurantsCtrl.renderRestaurantForm=(req,res)=>{
    res.render('restaurants/new_restaurant')
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
    res.redirect("/restaurant");
  }
    
};

restaurantsCtrl.renderRestaurants=async (req,res)=>{
  const id = req.params.id
    const restaurants=await Restaurant.find(id)
    .sort({ date: "desc" })
    .lean();
    res.render('restaurants/all_restaurants',{restaurants})
}

restaurantsCtrl.renderEditRestaurant=async (req,res)=>{
    const restaurant = await Restaurant.findById(req.params.id).lean();
    if (restaurant.user != req.user.id) {
      req.flash("error_msg", "Not Authorized");
      return res.redirect("/restaurant");
    }
    res.render('restaurants/edit_restaurant',{restaurant});
}

restaurantsCtrl.updateRestaurant=async(req,res)=>{
   const { name,location,speciality } = req.body;
   await Restaurant.findByIdAndUpdate(req.params.id,{ name,location,speciality})
   req.flash("success_msg", "Restaurant Updated Successfully");
   res.redirect("/restaurant");
}
restaurantsCtrl.deleteRestaurant=async (req,res)=>{
    await Restaurant.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Restaurant Deleted Successfully");
    res.redirect("/restaurant");
}
module.exports=restaurantsCtrl;