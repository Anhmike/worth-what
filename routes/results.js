var express = require('express');
var router = express.Router();

/* GET render listing. */
router.get('/', function(req, res, next) {
    var category = req.param('id');
    res.render('results', {worth: category});
    // res.render('results', {worth: 1000000});
});


module.exports = router;
