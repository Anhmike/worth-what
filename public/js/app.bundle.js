/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	document.addEventListener('DOMContentLoaded', function () {
	    var takePhotoBtn = document.getElementById('file');
	    var token = document.getElementById('token');
	    var modelId = "b778c20f3d494402b43e79dde1a2a53b";
	    console.log('');

	    Clarifai.initialize({ 'apiEndpoint': 'https://api2-prod.clarifai.com' });
	    Clarifai.setToken(token.innerText);

	    function uploadPhoto(e) {
	        var file = e.target.files[0];
	        var reader = new FileReader();

	        reader.readAsDataURL(file);
	        reader.addEventListener('loadend', function (result) {
	            console.log('loadend');
	            Clarifai.attachModelOutputs(modelId, {
	                'inputs': [{
	                    "data": {
	                        "image": {
	                            "base64": reader.result.slice(23, reader.result.length)
	                        }
	                    }
	                }]
	            }).then(function (response) {
	                var tag = response && response.outputs && response.outputs[0] && response.outputs[0].data.tags[0];
	                var url = response.outputs[0].input.data.image.url;

	                if (tag && tag.concept && tag.concept.id) {
	                    window.location = '/results/?id=' + tag.concept.id + '&prob=' + tag.value + '&url=' + encodeURIComponent(url);
	                }
	                console.log(response.outputs[0].data.tags[0].concept.id, response.outputs[0].data.tags[0].value);
	            }, function (err) {
	                console.error(err);
	            });
	        });
	    }
	    takePhotoBtn.addEventListener('change', uploadPhoto);
	}, false);

/***/ }
/******/ ]);