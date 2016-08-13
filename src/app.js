document.addEventListener('DOMContentLoaded', function() {
    var takePhotoBtn = document.getElementById('file');
    var token = document.getElementById('token');
    var modelId = "b778c20f3d494402b43e79dde1a2a53b";
    console.log('')

    Clarifai.initialize({ 'apiEndpoint': 'https://api2-prod.clarifai.com' });
    Clarifai.setToken(token.innerText);

    function uploadPhoto(e) {
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.readAsDataURL(file);
        reader.addEventListener('loadend', function(result) {
            console.log('loadend')
            Clarifai.attachModelOutputs(modelId, {
                'inputs': [{
                    "data": {
                        "image": {
                            "base64": reader.result.slice(23, reader.result.length)
                        }
                    }
                }]
            }).then(
                function(response) {
                    var tag = response &&
                        response.outputs &&
                        response.outputs[0] &&
                        response.outputs[0].data.tags[0];
                    var url = response.outputs[0].input.data.image.url;

                    if (tag && tag.concept && tag.concept.id) {
                        window.location = '/results/?id=' + tag.concept.id + '&prob=' + tag.value  + '&url=' + encodeURIComponent(url);
                    }
                    console.log(response.outputs[0].data.tags[0].concept.id,
                    response.outputs[0].data.tags[0].value);
                },
                function(err) {
                    console.error(err);
                }
            );
        });
    }
    takePhotoBtn.addEventListener('change', uploadPhoto);
}, false);
