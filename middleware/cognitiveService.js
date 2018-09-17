var request = require('request');
require('dotenv').load();

module.exports = (speech, callback) => {
  const options = {
    url: 'https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',
    headers: {
      "Content-Type": "application/json",
      'Ocp-Apim-Subscription-Key' : process.env.MSFT_API_KEY
    },
    body: JSON.stringify({
      'documents' : [
        {
          'id': 1,
          'language': 'en',
          'text': speech
        }
      ]
    })
  }
  
  request.post(options, function(a, b, c) {
    callback(JSON.parse(c));
  });
}
