var Clarifai = require('./clarifai-2.0.2/index');
var getTags = require('./lib/getTags');
var modelId = "b778c20f3d494402b43e79dde1a2a53b";
prettyjson = require('prettyjson');

Clarifai.initialize({
    'clientId': process.env.CLIENT_ID,
    'clientSecret': process.env.CLIENT_SECRET,
    'apiEndpoint': 'https://api2-prod.clarifai.com'
});


function createModel() {
    Clarifai.createModelVersion(modelId).then(
        function(response) {
            console.log(prettyjson.render(response));
        },
        function(err) {
            console.error(err);
       }
    )
};


function uploadPic(imageUrl) {
    var imageTag = {
        image: {
            url: imageUrl
        }
    }

    Clarifai.attachModelOutputs(modelId, {
        'inputs': [
            {
                "data": imageTag
            }
        ]
    }).then(
        function(response) {
            console.log("ATTACH MODEL OUTPUTS");
            console.log(prettyjson.render(response));
        },
        function(err) {
            console.error(err);
        }
    );
}

createModel();
uploadPic("http://images.kpop.musictimes.com/data/images/full/368967/image-jpg.jpg?w=600");