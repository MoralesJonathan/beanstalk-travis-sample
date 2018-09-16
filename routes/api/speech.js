const express = require('express');
const router = express.Router();
const fillers = ['so', 'and', 'like', 'actually', 'you know', 'totally', 'i mean', 'just', 'literaly', 'so basically', 'anyway']; 
const mongoClient = require('mongodb').MongoClient;
const mongoDbUrl = `mongodb://root:password1@ds123790.mlab.com:23790/shellhacks`;

router.get('/test',(req, res) => { 
  res.json('the user endpoint works') 
})

router.get('/frank/:collection/:timestamp', function (req, res) {
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

  });

module.exports = router;