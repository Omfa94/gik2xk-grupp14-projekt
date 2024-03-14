var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/products",require("./routes/productsRoute"));
app.use("/users",require("./routes/usersRoute"));
app.use("/carts",require("./routes/cartsRouter"));

module.exports = app;
