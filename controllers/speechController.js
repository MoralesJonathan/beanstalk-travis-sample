const mongoClient = require('mongodb').MongoClient;

// load environent variables
require('dotenv').load();

// Require middleware for congitive service
const cognitiveService = require('../middleware/cognitiveService');

// set variables
const mongoDbUrl = `mongodb://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@ds123790.mlab.com:23790/shellhacks`;
const fillers = ['so', 'and', 'like', 'actually', 'you know', 'totally', 'i mean', 'just', 'literaly', 'so basically', 'anyway'];

module.exports = {
    test: (req, res) => {
      res.status(200).json('the user endpoint works') 
    },
    listSpeeches: (req, res) => {
        mongoClient.connect(mongoDbUrl, (error, db) => {
          if (!error) {
            console.log("Connected successfully to MongoDB server");
            db.collection(req.params.collection).find({}).toArray((err, data) => {
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
      },
      addTitle: (req, res) => {
        mongoClient.connect(mongoDbUrl, (error, db) => {
          if (!error) {
            console.log("Connected successfully to MongoDB server");
            db.collection(req.body.collection).update({
              'startTimestamp': parseInt(req.body.timestamp)
            }, { '$set': { "title": req.body.title } },(err, result) => {
              if (!err) {
                res.send(200)
              }
              else {
                console.error(error)
                res.status(500).send(err)
              }
            })
          } else {
            console.error(error)
            res.status(500).send(false)
          }
        })
      },
      getSpeech: (req, res) => {
        mongoClient.connect(mongoDbUrl, (error, db) => {
          if (!error) {
            console.log("Connected successfully to MongoDB server");
            db.collection(req.params.collection).findOne({
              'startTimestamp': parseInt(req.params.timestamp)
            }, (err, speech) => {
              if (err) {
                res.status(500).send(false)
                console.error(err)
              } else {
                speechString = speech.text.length > 1 ? speech.text.join(" ") : speech.text[0];
                let sentimental = new Promise((resolve, reject) => {
                  cognitiveService(speechString, data => {
                    resolve(data);
                  })
                })
                let countMostUsedWord = new Promise((resolve, reject) => {
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
      
                    which = which.length > 1 ? `${which.join(` + `)}` : which = `"${which}"`
      
                    resolve(which)
                  } catch (e) {
                    reject('')
                  }
                });
      
                let countFillers = new Promise((resolve, reject) => {
                  let fillerStats = [];
                  try {
                    fillers.forEach(filler => {
                      fillerStats.push((speechString.match(new RegExp(filler, "gi")) || []).length);
                    });
                    resolve(fillerStats)
                  } catch (e) {
                    reject([])
                  }
                });
      
                let getDuration = new Promise((resolve, reject) => {
                  speech.startTimestamp && speech.endTimestamp ? resolve(Math.floor((speech.endTimestamp - speech.startTimestamp) / 1000)) : reject(null)
                });
      
                Promise.all([countMostUsedWord, countFillers, getDuration, sentimental]).then(values => {
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
      },
      saveSpeech: (req, res) => {
        mongoClient.connect(mongoDbUrl, (error, db) => {
          if (!error) {
            console.log("Connected successfully to MongoDB server");
            db.collection(req.body.collection).insertOne({
              "startTimestamp": req.body.startTime,
              "endTimestamp": req.body.endTime,
              "text": req.body.text
            }, (err, success) => {
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
      }
  }