require('dotenv').config();
var Clarifai = require('./clarifai-2.0.2/index');
//model id: b778c20f3d494402b43e79dde1a2a53b

Clarifai.initialize({
    'clientId': process.env.CLIENT_ID,
    'clientSecret': process.env.CLIENT_SECRET,
    'apiEndpoint': 'https://api2-prod.clarifai.com'
});

fs = require('fs');

function generateInput(imageUrl, id, value) {
    var concepts = [
        'superRich',
        'rich',
        'middleClass',
        'poor',
        'homeless'
    ]

    var tags = [];
    for (var i=0; i<concepts.length; i++) {
        var conceptTag = {};
        conceptTag.concept = {};
        conceptTag.value = false;
        conceptTag.concept = {
            id: concepts[i]
        }
        if (concepts[i] == id) {
            conceptTag.value = value;
        }
        tags.push(conceptTag);
    }

    var input = {};
    input['data'] = {
        image: {
            url: imageUrl
        }
    }
    input['data'].tags = tags;


    Clarifai.addInputs([
        input
    ]).then(
        function(response) {
            console.log(prettyjson.render(response));
        },
        function(error) {
            console.error("ERROR", error);
        }
    )
}

var files = [
    {
        fileName: 'Category1',
        category: 'superRich'
    },
    {
        fileName: 'Category2',
        category: 'rich'
    },
    {
        fileName: 'Category3',
        category: 'middleClass'
    }, 
    {
        fileName: 'Category4',
        category: 'poor'
    },
    {
        fileName: 'Category5',
        category: 'homeless'
    }
]

for (var i=0; i<files.length; i++) {
    var file,
        lines;
    var fileName = files[i].fileName;
    var category = files[i].category;

    file = fs.readFileSync(fileName, 'utf8');
    lines = file.split('\n');
    for (var j=0; j<lines.length; j++) {
        generateInput(lines[j], category, true);
    }
}