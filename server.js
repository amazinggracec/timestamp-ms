var path = require('path');
var express = require('express');
var app = express();

var port = process.env.PORT;
var moment = require('moment');

function natToUnix(date) {
    // Conver from natural date to unix timestamp
    return moment(date, "MMMM D, YYYY").format("X");
}

function unixToNat(unix) {
    // Convert unix timestamp to natural date
    return moment.unix(unix).format("MMMM D, YYYY");
}

app.use(express.static(path.resolve(__dirname)));
app.get("/:query", function(req, res){
    if (req.params.query != ""){
        var date = req.params.query;
        var unix = null;
        var natural = null;
        
        // Check for initial unix time
        if (+date >= 0) {
            unix = +date;
            natural = unixToNat(unix);
        } 
        
        // Check for initial natural time
        if (isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()) {
            unix = natToUnix(date);
            natural = unixToNat(unix);
        }
        
        var dateObj = { "unix": unix, "natural": natural };
        res.json(dateObj);
    }
});


app.listen(port || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Server listening at", port);
});
