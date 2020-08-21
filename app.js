var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var port = process.env.PORT || 3000;



mongoose.connect('mongodb+srv://TomBrose:Charlie1!@cluster0.gspeu.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to Cluster!'))
.catch(error => console.log(error.message));


// ///////// Passport Config ////////////
app.use(require("express-session")({
	secret:"Beef is the best!",
	resave: false,
	saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
app.use(flash());
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});



app.use(indexRoutes);
app.use(campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


// seedDB();



app.listen(port, function () {
 console.log("Server Has Started!");
});