const express = require('express');
const router = express.Router();
require('dotenv').load();
const cognitiveService = require('../../middleware/cognitiveService');
const fillers = ['so', 'and', 'like', 'actually', 'you know', 'totally', 'i mean', 'just', 'literaly', 'so basically', 'anyway'];
const mongoClient = require('mongodb').MongoClient;
const mongoDbUrl = `mongodb://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@ds123790.mlab.com:23790/shellhacks`;
router.get('/test',(req, res) => {
  res.json('the user endpoint works')
})

router.get('/list/:collection', function (req, res) {
  mongoClient.connect(mongoDbUrl, function (error, db) {
    if (!error) {
      console.log("Connected successfully to MongoDB server");
      db.collection(req.params.collection).find({}).toArray(function(err,data){
        console.log(data)
        res.send(data)
      })
    } else {
      console.log(error)
      res.send(false)
    }
  })
})

router.get('/:collection/:timestamp', function (req, res) {
    mongoClient.connect(mongoDbUrl, function (error, db) {
      if (!error) {
        console.log("Connected successfully to MongoDB server");
        db.collection(req.params.collection).findOne({
          'startTimestamp': parseInt(req.params.timestamp)
        }, function (err, speech) {
          if (err) res.send(false)
          speechString = speech.text.length > 1 ? speech.text.join(" ") : speech.text[0];
          // console.log(cognitiveService(speechString));
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

  });

router.post('/', function (req, res) {
  mongoClient.connect(mongoDbUrl, function (error, db) {
    if (!error) {
      console.log("Connected successfully to MongoDB server");
      db.collection(req.body.collection).insertOne({
        "startTimestamp" : req.body.startTime,
        "endTimestamp": req.body.endTime,
        "text":req.body.text
      }, function(err,success){
        if(!err){
          res.send(200);
        } else {
          console.log(err)
          res.send(err)
        }
      })
    } else {
      console.dir(error);
      res.send(error);
    }
  })
})

module.exports = router;
