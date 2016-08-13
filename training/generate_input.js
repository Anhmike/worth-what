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
    ])
}