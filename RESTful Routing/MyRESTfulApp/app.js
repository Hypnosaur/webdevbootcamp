var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    methodOverride   = require("method-override"),
    expressSanitizer = require("express-sanitizer");
    
// APP CONFIG

mongoose.connect("mongodb://localhost:27017/restful_dog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG
var dogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default:Date.now}
});
var Dog = mongoose.model("Dog", dogSchema);


//RESTFUL ROUTES

app.get("/", function(req, res){
    res.redirect("/dogs");
});

//INDEX ROUTE

app.get("/dogs", function(req, res){
    Dog.find({}, function(err, dogs){
        if(err){
            console.log("ERROR");
        } else {
            res.render("index", {dogs: dogs});
        }
    });
});

//NEW ROUTE

app.get("/dogs/new", function(req, res){
    res.render("new");
});


// CREATE ROUTE

app.post("/dogs", function(req, res){
    console.log(req.body);
    req.body.dog.body = req.sanitize(req.body.dog.body);
    console.log(req.body);
    Dog.create(req.body.dog, function(err, newDog){
        if (err){
            res.render("new");
        } else {
            // redirect to index
            res.redirect("/dogs");
        }
    });
});
// SHOW ROUTE
app.get("/dogs/:id", function(req, res){
    Dog.findById(req.params.id, function(err, foundDog){
        if(err){
            console.log(err);
        } else {
            res.render("show", {dog: foundDog});
        }
    });
});

//EDIT ROUTE
app.get("/dogs/:id/edit", function(req, res){
    Dog.findById(req.params.id, function(err, foundDog){
        if(err){
            console.log(err);
        } else {
            res.render("edit", {dog: foundDog});
        }
    });
});

// UPDATE ROUTE

app.put("/dogs/:id", function(req, res){
    req.body.dog.body = req.sanitize(req.body.dog.body);
    Dog.findByIdAndUpdate(req.params.id, req.body.dog, function(err, updatedDog){
        if(err){
            console.log(err);
        } else {
            res.redirect("/dogs/" + req.params.id);
        }
    });
});

// DELETE ROUTE

app.delete("/dogs/:id", function(req, res){
    Dog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/dogs");
        }
    });
});








app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS ALIVE!");
});