const express = require('express'),
  dotenv = require('dotenv').load(),
  server = express(),
  http = require('http').Server(server),
  port = process.env.PORT || 8080,
  environment = server.get('env'),
  path = require("path"),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  mongoClient = require('mongodb').MongoClient,
  ObjectID = require('mongodb').ObjectID,
  mongoDbUrl = `mongodb://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSOWRD}@ds123790.mlab.com:23790/shellhacks`,
  fillers = ['so', 'and', 'like', 'actually', 'you know', 'totally', 'i mean', 'just', 'literaly', 'so basically', 'anyway'];

server
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(logger('common'))
  .get('/', function (req, res) {
    res.status(200).send('hi');
  })
  .get('/getSpeech/:collection/:timestamp', function (req, res) {
    mongoClient.connect(mongoDbUrl, function (error, db) {
      if (!error) {
        console.log("Connected successfully to MongoDB server");
        db.collection(req.params.collection).findOne({
          'startTimestamp': parseInt(req.params.timestamp)
        }, function (err, speech) {
          if (err) res.send(false)
          speechString = speech.text.length > 1 ? speech.text.join(" ") : speech.text[0];
          let countMostUsedWord = new Promise(function (resolve, reject) {
            try {
              arr = speechString.split(" ")
              var obj = {}, mostFreq = 0, which = [];

              arr.forEach(ea => {
                if (!obj[ea]) {
                  obj[ea] = 1;
                } else {
                  obj[ea]++;
                }
                if (obj[ea] > mostFreq) {
                  mostFreq = obj[ea];
                  which = [ea];
                } else if (obj[ea] === mostFreq) {
                  which.push(ea);
                }
              });

              if (which.length > 1) {
                which = `${which.join(` and `)}`
              } else {
                which = `"${which}"`
              }

              resolve(which)
            } catch (e) {
              reject('')
            }
          });

          let countFillers = new Promise(function (resolve, reject) {
            let fillerStats = {};
            try {
              fillers.forEach(function (filler) {
                fillerStats[filler] = (speechString.match(new RegExp(filler, "gi")) || []).length;
              });
              resolve(fillerStats)
            } catch (e) {
              reject({})
            }
          });

          let getDuration = new Promise(function (resolve, reject) {
            speech.startTimestamp && speech.endTimestamp ? resolve(Math.floor((speech.endTimestamp - speech.startTimestamp) / 1000)) : reject(null)
          });

          Promise.all([countMostUsedWord, countFillers, getDuration]).then(function (values) {
            res.send({
              mostUsedWord: values[0],
              fillersCount: values[1],
              speechDuration: values[2]
            });
            db.close();
          });
        });
      }
      else {
        console.dir(error);
        res.send(error);
      }
    })

  })

http.listen(port, () => {
  console.log(`Server is running on port ${port} and is running with a ${environment} environment.`);
});



