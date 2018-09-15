const express = require('express')
  server = express()
  port = process.env.PORT || 8080
  environment = server.get('env')
  path = require("path")
  logger = require('morgan')
  bodyParser = require('body-parser')
  fs = require('fs')
  session = require('express-session')
  mongoClient = require('mongodb').MongoClient
  MongoStore = require('connect-mongo')(express)
  ObjectID = require('mongodb').ObjectID
  keys = require("keys.json");

server
  .set('view engine', 'pug')
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(express.cookieParser())
  .use(logger('common'))
  .use(session({
    secret: keys.session,
    resave: false,
    rolling: true,
    cookie: { maxAge: 900000 },
    store: new MongoStore({
      url: `mongodb://${keys.mongoUsername}:${keys.mongoPassword}@ds123790.mlab.com:23790/shellhacks`
    }),
    saveUninitialized: false
  }))

  .get('/', function(req, res) {
    res.render('index');
  })

  .listen(port, () => {
    console.log(`Server is running on port ${port} and is running with a ${environment} environment.`);
  });