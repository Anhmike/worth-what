var express = require('express');
var router = express.Router();

/* GET render listing. */
router.get('/', function(req, res, next) {
    var category = req.param('id');
    var image = req.param('url');
    if (category == 'middleClass') {
        category = 'middle class';
    } else if (category == 'superRich') {
        category = 'super rich';
    }
    res.render('results', {worth: category, image: image});
});


module.exports = router;
