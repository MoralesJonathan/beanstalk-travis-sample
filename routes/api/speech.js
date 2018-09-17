const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
require('dotenv').load();

// Require middleware for congitive service
const cognitiveService = require('../../middleware/cognitiveService');

// set variables
const mongoDbUrl = `mongodb://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@ds123790.mlab.com:23790/shellhacks`;
const fillers = ['so', 'and', 'like', 'actually', 'you know', 'totally', 'i mean', 'just', 'literaly', 'so basically', 'anyway'];

// @route GET api/speech/test
// @desc Tests the users route
// @acess Public
// @returns a 200 and simple user works messages
router.get('/test', (req, res) => {
  res.json('the user endpoint works')
})

// @route GET api/speech/list/list/:collection
// @desc Gets a lits of recording
// @acess Public
// @returns a 200 and list of recordings
// @returns a 500 for db error
router.get('/list/:collection', (req, res) => {
  mongoClient.connect(mongoDbUrl, (error, db) => {
    if (!error) {
      console.log("Connected successfully to MongoDB server");
      db.collection(req.params.collection).find({}).toArray((err, data ) => {
        !err ? res.status(200).send(data) : (
          console.error(error),
          res.status(500).send(err)
        )
      })
    } else {
      console.error(error)
      res.status(500).send(false)
    }
  })
})

// @route GET api/speech/:collection/:timestamp
// @desc Processes speech string and returns information on speech
// @acess Public
// @returns a 200 and object of information
// @returns a 500 for db error
router.get('/:collection/:timestamp', (req, res) => {
  mongoClient.connect(mongoDbUrl, (error, db) => {
    if (!error) {
      console.log("Connected successfully to MongoDB server");
      db.collection(req.params.collection).findOne({
        'startTimestamp': parseInt(req.params.timestamp)
      }, (err, speech ) => {
        if (err) {
          res.status(500).send(false)
          console.error(err)
        } else {
          speechString = speech.text.length > 1 ? speech.text.join(" ") : speech.text[0];
          let sentimental = new Promise((resolve, reject) =>  {
            cognitiveService(speechString, data  => {
              resolve(data);
            })
          })
          let countMostUsedWord = new Promise((resolve, reject) =>  {
            try {
              arr = speechString.split(" ")
              var obj = {}, mostFreq = 0, which = [];

              arr.forEach(ea => {
                if (ea != '') {
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
                }
              });

              which =  which.length > 1? `${which.join(` + `)}`: which = `"${which}"`

              resolve(which)
            } catch (e) {
              reject('')
            }
          });

          let countFillers = new Promise((resolve, reject) =>  {
            let fillerStats = {};
            try {
              fillers.forEach(filler  => {
                fillerStats[filler] = (speechString.match(new RegExp(filler, "gi")) || []).length;
              });
              resolve(fillerStats)
            } catch (e) {
              reject({})
            }
          });

          let getDuration = new Promise((resolve, reject) =>  {
            speech.startTimestamp && speech.endTimestamp ? resolve(Math.floor((speech.endTimestamp - speech.startTimestamp) / 1000)) : reject(null)
          });

          Promise.all([countMostUsedWord, countFillers, getDuration, sentimental]).then(values  => {
            res.status(200).json({
              mostUsedWord: values[0],
              fillersCount: values[1],
              speechDuration: values[2],
              sentimentalScore: values[3]
            });
            db.close();
          });
        }
      });
    }
    else {
      console.error(error);
      res.status(500).send(error);
    }
  })

});

// @route POST api/speech/
// @desc Inserts speech data
// @acess Public
// @returns a 200 if posted successfully
// @returns a 500 for db error
router.post('/', (req, res) => {
  mongoClient.connect(mongoDbUrl, (error, db) => {
    if (!error) {
      console.log("Connected successfully to MongoDB server");
      db.collection(req.body.collection).insertOne({
        "startTimestamp": req.body.startTime,
        "endTimestamp": req.body.endTime,
        "text": req.body.text
      }, (err, success ) => {
        if (!err) {
          res.send(200);
        } else {
          console.error(error)
          res.status(500).send(err)
        }
      })
    } else {
      console.error(error);
      res.status(500).send(error);
    }
  })
})

module.exports = router;
