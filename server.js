const express = require('express')
  dotenv = equire('dotenv').load()
  server = express()
  port = process.env.PORT || 8080
  environment = server.get('env')
  path = require("path")
  logger = require('morgan')
  bodyParser = require('body-parser')
  fs = require('fs')
  mongoClient = require('mongodb').MongoClient
  ObjectID = require('mongodb').ObjectID
  mongoDbUrl = `mongodb://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@ds123790.mlab.com:23790/shellhacks`;

server
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(logger('common'))
  .get('/', function(req, res) {
    res.status(200).send('hi');
  })
  .listen(port, () => {
    console.log(`Server is running on port ${port} and is running with a ${environment} environment.`);
  });
