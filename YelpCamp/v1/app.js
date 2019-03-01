var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
        {name: "Salmon Creek", image:"https://farm8.staticflickr.com/7902/32954858818_e1637ae7d1.jpg"},
        {name: "Granite Hill", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
        {name: "Mountain Goat's Ridge", image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
        {name: "Salmon Creek", image:"https://farm8.staticflickr.com/7902/32954858818_e1637ae7d1.jpg"},
        {name: "Granite Hill", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
        {name: "Mountain Goat's Ridge", image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
        {name: "Salmon Creek", image:"https://farm8.staticflickr.com/7902/32954858818_e1637ae7d1.jpg"},
        {name: "Granite Hill", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
        {name: "Mountain Goat's Ridge", image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"}
        ];
        
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
   // get data from form and add to camgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image};
   campgrounds.push(newCampground);
  //redirect to campground page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has Started");
});