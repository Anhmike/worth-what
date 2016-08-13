
document.addEventListener('DOMContentLoaded', function () {
    var takePhotoBtn = document.getElementById('take-photo');
    var token = document.getElementById('token');
    console.log('')

    Clarifai.initialize({'apiEndpoint': 'https://api2-prod.clarifai.com'});
    Clarifai.setToken(token.innerText);
    
    function uploadPhoto(file) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {

        });
        reader.readAsDataURL(file);
        console.log(file);
    }
    takePhotoBtn.addEventListener('change', uploadPhoto);
}, false);