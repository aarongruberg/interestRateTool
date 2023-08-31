const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(morgan("tiny"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/interestRates.html");
});

app.post("/", function(req, res){
var principal = Number(req.body.principal);
var interestRate = parseFloat(req.body.interestRate);
var years = Number(req.body.years);
var monthly = parseFloat(req.body.monthlycontribution);
console.log(monthly);
var annual = monthly * 12;
// Interest from contributions
var contributions = 0;

var one_plus_interest = 1 + interestRate;
var multiplier = Math.pow(one_plus_interest, (years));

// Calculate return when interest is compounded monthly
var total = principal * multiplier;
console.log("original total: " + total);

contributions = (((Math.pow((1 + interestRate), years)) - 1) * annual)/interestRate;
console.log("contributions: " + contributions);

total += contributions;

    res.send("Total value after " + years + " years: " + total);
});

app.listen(3000, function(){
    console.log("server listening on port 3000...");
});