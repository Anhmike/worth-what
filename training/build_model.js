require('dotenv').config();
var Clarifai = require('./clarifai-2.0.2/index');
var getTags = require('./lib/getTags');
//model id: b778c20f3d494402b43e79dde1a2a53b

Clarifai.initialize({
    'clientId': process.env.CLIENT_ID,
    'clientSecret': process.env.CLIENT_SECRET,
    'apiEndpoint': 'https://api2-prod.clarifai.com'
});

Clarifai.addInputs([{
    "data": {
      "image": {
        "url": "http://www.eonline.com/eol_images/Entire_Site/2015516/rs_634x1024-150616073901-634.Donald-Trump.jl.061615.jpg"
      },
      "tags": getTags('superRich')
    },
    "id": "some-id"
}]).then(function(response) {
    Clarifai.createModel({
        'name': 'what-worth',
        'concepts': [{
            'id': 'superRich'
        }, {
            'id': 'rich'
        }, {
            'id': 'middleClass'
        }, {
            'id': 'poor'
        }, {
            'id': 'homeless'
        }]
    }).then(
        function (response) {
            console.log(response);
        },
        function (err) {
            console.log(err);
        }
    );
  },
  function(err) {
    console.error(err);
});

