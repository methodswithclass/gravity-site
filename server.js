const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const middle = require("./server/middleware.js");

const app = express();


app.use(middle.refresh());
if  (process.env.NODE_ENV == "production") app.use(middle.ssl());
else {console.log("environment development");}

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


app.use("/", express.static(path.join(__dirname, "dist")));


var listener = app.listen(process.env.PORT || 8080, function () {

	console.log("listening on port", listener.address().port);
});