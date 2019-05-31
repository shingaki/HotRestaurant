// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 7000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var reservations = [
    {
        routeName: "tamami",
        name: "tamami",
        number: 88888,
        email: "tamami@hotmail.com",
        customerid: 1234
    },
    {
        routeName: "michael",
        name: "michael",
        number: 99999,
        email: "mike@hotmail.com",
        customerid: 5678
    }

]


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "form.html"));
});


app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});



app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

app.post("/api/reservations", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newRes = req.body;
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newRes.routeName = newRes.name.replace(/\s+/g, "").toLowerCase();
    console.log(newRes);
    res.json(newRes);
});

// Displays all reservations
app.get("/api/viewreservations", function(req, res) {
    return res.json(reservations);
});


app.get("/api/viewreservations/:reservations", function(req, res) {
    var chosen = req.params.reservations;

    console.log(chosen);

    for (var i = 0; i < reservations.length; i++) {
        if (chosen === reservations[i].routeName) {
            return res.json(reservations[i]);
        }
    }

    return res.json(false);
});



