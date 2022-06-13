const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
require('./config/passport');
const createAdminUser =require('./libs/createUser');

const index=require('./routes/index.routes');
const restaurants=require('./routes/restaurant.routes');
const users=require('./routes/user.routes');

var handlebars = require('express-handlebars').create({
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    defaultLayout: 'main',
    extname: 'hbs'
  });

const app=express();
createAdminUser();


//Settings
app.set('port', process.env.PORT || 4000);

app.set('views', path.join(__dirname,'views'));

app.engine('hbs',handlebars.engine);
app.set("view engine", "hbs");

//Middlewares
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(methodOverride("_method"));
app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized:true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


//Global Variables

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  res.locals.restaurants = req.restaurants || null;
  next();
});

//Routes
app.use(index);
app.use(restaurants);
app.use(users);


//Static Files
app.use(express.static(path.join(__dirname,'public')));

app.use((req, res) => {
  res.render("404");
});

module.exports = app