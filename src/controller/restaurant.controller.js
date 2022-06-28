const Restaurant = require("../models/Restaurants");
const Ratings = require("../models/Ratings");
const restaurantsCtrl = {};

restaurantsCtrl.renderRestaurantForm = (req, res) => {
  res.render("restaurants/new_restaurant");
};
restaurantsCtrl.renderRestaurants = async (req, res) => {
  const restaurants = await Restaurant.find().sort({ date: "desc" }).lean();

  res.render("restaurants/restaurants", { restaurants});
};
restaurantsCtrl.getComments = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id).lean();
  res.render("restaurants/comment_restaurant", { restaurant });
}
restaurantsCtrl.insertComments = async (req, res) => { 
  const { comment,score,restaurant } = req.body;
  const newComment = new Ratings({
    restaurant,
    comment,
    score,
  });
  newComment.user = req.user.id;
  await newComment.save();
  res.redirect("restaurant/myRestaurants");
}

restaurantsCtrl.obtenerCalificar = async (req, res) => {
 const ratings = await Ratings.find().lean();
 return res.render("restaurants/ver_Comentarios", { ratings });
}


restaurantsCtrl.createRestaurant = async (req, res) => {
  const { name, location, speciality, score, precio, latitud, longitud } =req.body;
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
  if (!score) {
    errors.push({ text: "Please Write a score" });
  }
  if (!latitud) {
    errors.push({ text: "Please Write a latitud" });
  }
  if (!longitud) {
    errors.push({ text: "Please Write a longitud" });
  }
  if (errors.length > 0) {
    res.render("restaurant/new_restaurant", {
      errors,
      name,
      location,
      speciality,
      score,
      precio,
      latitud,
      longitud,
    });
  } else {
    const newRestaurant = new Restaurant({
      name,
      location,
      speciality,
      score,
      precio,
      latitud,
      longitud,
    });
    newRestaurant.user = req.user.id;
    await newRestaurant.save();
    req.flash("success_msg", "Restaurant Added Successfully");
    res.redirect("/restaurant/myRestaurants");
  }
};

restaurantsCtrl.renderRestaurantsbyUser = async (req, res) => {
  const restaurants = await Restaurant.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("restaurants/all_restaurants", { restaurants });
};

restaurantsCtrl.renderEditRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id).lean();
  if (restaurant.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/restaurant/myRestaurants");
  }
  res.render("restaurants/edit_restaurant", { restaurant });
};
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}


//core para obtener los restaurantes cercanos, por especialidad y tipo de precio
restaurantsCtrl.filter = async (req, res) => {
  const latitudUser = req.user.latitud;
  const longitudUser = req.user.longitud;
  const restaurants = await Restaurant.find().lean();
  const latidudRestaurant = restaurants.map((restaurant) => restaurant.latitud);
  const longitudRestaurant = restaurants.map(
    (restaurant) => restaurant.longitud
  );
  const restaurantName = restaurants.map((restaurant) => restaurant.name);
  const distancia = [];
  const restaurantes = [];

  //funcion para ver los restaurantes a menos de 10 km de la ubicacion del usuario
  if (req.body.distancia == "10") {
    for (var i = 0; i < latidudRestaurant.length; i++) {
      for (var j = 0; j < longitudRestaurant.length; j++) {
        var km =
          getKilometros(
            latitudUser,
            longitudUser,
            latidudRestaurant[i],
            longitudRestaurant[j]
          ) < 10;
      }
      restaurantName.push(restaurants[i].name);
      distancia.push(km);
    }
    restaurantName.filter(onlyUnique);

    for (var i = 0; i < distancia.length; i++) {
      var object = JSON.stringify({
        distancia: distancia[i],
        restaurantName: restaurantName[i],
      });
      restaurantes.push(JSON.parse(object));
    }

    restaurantes.filter(onlyUnique);
    restaurantes.forEach(function (item) {
      if (item.distancia == false) {
        item.distancia = "";
        item.restaurantName = "";
      }
    });
    var result=[];
    var names = restaurantes.map((restaurantes) => restaurantes.restaurantName);
    //var result =JSON.stringify(names);
  for(var i=0;i<names.length;i++){
    console.log(names[i]);
    result.push(names[i]);
  }
  
    console.log(result);
    const resutorants = await Restaurant.find({ name: { $in: result } }).sort({score: "desc"}).lean();
    console.log(`Hay ${resutorants} restaurantes en la coleccion`)
    return res.send(resutorants);
    //return res.render("restaurants/restaurants", { resutorants });
  }

  //funcion para ver los restaurantes a mas de 10 km de la ubicacion del usuario
  if (req.body.distancia == "11") {
    for (var i = 0; i < latidudRestaurant.length; i++) {
      for (var j = 0; j < longitudRestaurant.length; j++) {
        var km =
          getKilometros(
            latitudUser,
            longitudUser,
            latidudRestaurant[i],
            longitudRestaurant[j]
          ) > 10;
      }
      restaurantName.push(restaurants[i].name);
      distancia.push(km);
    }
    restaurantName.filter(onlyUnique);

    for (var i = 0; i < distancia.length; i++) {
      var object = JSON.stringify({
        distancia: distancia[i],
        restaurantName: restaurantName[i],
      });
      restaurantes.push(JSON.parse(object));
    }

    restaurantes.filter(onlyUnique);
    restaurantes.forEach(function (item) {
      if (item.distancia == false) {
        item.distancia = "";
        item.restaurantName = "";
      }
    });
    var result=[];
    var names = restaurantes.map((restaurantes) => restaurantes.restaurantName);
    for(var i=0;i<names.length;i++){
      console.log(names[i]);
      result.push(names[i]);
    }
    
      console.log(result);
      const resutorants = await Restaurant.find({ name: { $in: result } }).sort({score: "desc"}).lean();
      console.log(`Hay ${resutorants} restaurantes en la coleccion`)
      return res.send(resutorants);
     //return res.render("restaurants/restaurants", { resutorants });
  }

  if (req.body.speciality) {
    const restaurants = await Restaurant.find({
      speciality: req.body.speciality,
    })
      .sort({ score: "desc" })
      .lean();
    return res.render("restaurants/restaurants", { restaurants });
  }
  if (req.body.precio) {
    const restaurants = await Restaurant.find({
      precio: req.body.precio,
    })
      .sort({ score: "desc" })
      .lean();
    console.log(req.body.precio);
    return res.render("restaurants/restaurants", { restaurants });
  }
};
restaurantsCtrl.calificar = async (req, res) => {
  const{score} = req.body;
  const ratings = await Ratings.find({restaurant: req.body.restaurant}).lean();
  const valor = ratings.map((rating) => rating.score);
  const scoreNum = parseFloat(score);
  const valorNum = parseFloat(valor);
  const valorTotal = valorNum + scoreNum;
  const valorPromedio = valorTotal / 2;
  console.log(valorNum);
  console.log(scoreNum);
  console.log(valorPromedio);

  const newRating = await Ratings.updateOne({restaurant: req.body.restaurant}, {$set: {score: valorPromedio} } );
  return res.render("restaurants/calificar", { newRating });

}
restaurantsCtrl.renderCalificar = async (req, res) => {
  const ratings = await Ratings.findById(req.params.id).lean();
  res.render("restaurants/calificar", { ratings });
}
restaurantsCtrl.updateRestaurant = async (req, res) => {
  const { name, location, speciality, score, precio, latitud, longitud } = req.body;
  await Restaurant.findByIdAndUpdate(req.params.id, {
    name,
    location,
    speciality,
    score,
    precio,
    latitud,
    longitud,
  });
  req.flash("success_msg", "Restaurant Updated Successfully");
  res.redirect("/restaurant/myRestaurants");
};
restaurantsCtrl.deleteRestaurant = async (req, res) => {
  await Restaurant.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Restaurant Deleted Successfully");
  res.redirect("/restaurant/myRestaurants");
};

//funcion para calcular la distancia
getKilometros = function (lat1, lon1, lat2, lon2) {
  rad = function (x) {
    return (x * Math.PI) / 180;
  };
  var R = 6378.137; //Radio de la tierra en km
  var dLat = rad(lat2 - lat1);
  var dLong = rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) *
      Math.cos(rad(lat2)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d.toFixed(2);
};
module.exports = restaurantsCtrl;
