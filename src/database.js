const mongoose = require("mongoose");
const MONGODB_URI =
  "mongodb+srv://admin:admin@cluster0.hy43r.mongodb.net/RestaurantDB?retryWrites=true&w=majority";
mongoose
  .connect(MONGODB_URI)
  .then((db) => console.log("database is connected"))
  .catch((err) => console.log(err));
