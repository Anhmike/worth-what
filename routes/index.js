var express = require('express');
var router = express.Router();

/* GET home page. */
function useClarifai(Clarifai) {
    router.get('/', function(req, res, next) {
        Clarifai.getToken().then(
          function(response) {
            res.render('index', { token: response });
            console.log(response);
          },
          function(err){
            res.render('index', { token: null });
          }
        );
    });

    return router;
}

module.exports = useClarifai;
