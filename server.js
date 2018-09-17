const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes');

const app = express();
const PORT = process.env.port || 5001;


// MiddleWares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(mongoSanitize({ replaceWith: '_' }));

// DB Config
const db = `mongodb://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@ds123790.mlab.com:23790/shellhacks`;
app.use(express.static('public'))

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
app.use(routes);

// Listen on port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
