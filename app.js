const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const bodyParser = require("body-parser");
const app = express();

const dbConnect = require("./config/dbConnect");

const productRoute = require("./routes/product")
const userRoute = require("./routes/user");

const port = 3000

// connect to mongo
dbConnect();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 24 *1000 }
}))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/product", productRoute);
app.use("/user", userRoute);

app.listen(process.env.PORT || port, () => console.log(`Server is running on port ${port}`))

module.exports = app;
