var express = require('express');
var app = express();

// '/' prints "Hi there, welcome to my assignment!"
app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});
// '/speak/pig' print "The pig says 'Oink'"
app.get("/speak/:animalType", function(req, res){
    var animal = req.params.animalType;
    var noises = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!"
    };
    var noise = noises[animal];
    res.send("The " + animal +" says '" +noise+ "'");
});

// '/repeat/hello/3' print 'hello hello hello'"
// '/repeat/hello/5' print 'hello hello hello hello hello'"
// '/repeat/blah/2' print 'bah blah'"
app.get("/repeat/:randomWord/:number", function(req, res){
    var word = req.params.randomWord;
    var num = Number(req.params.number);
    var string = "";
    for(var i = 0; i < num; i++){
       string += word+" ";
    }
     res.send(string);
});

//If a user visits any other route print "Sorry, page not found...What are you doing with your life?"
app.get("*", function(req, res){
    res.send("Sorry, page not found...What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has Started!");
});