var request = require('request');

module.exports = (speech) =>{
  var options = {
    url: 'https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases',
    headers: {
      "Content-Type": "application/json",
      'Ocp-Apim-Subscription-Key' : process.env.MSFT_API_KEY
    }
  }
  var documents = {
    'documents' : [
      {
        'id': 1,
        'language': 'en',
        'text': speech
      }
    ]
  }

  request.post(options, documents).on('response', function(response) {
    return response[0];
  });
}
