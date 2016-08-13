var express = require('express');
var router = express.Router();

/* GET render listing. */
router.get('/', function(req, res, next) {
    res.render('index', { token: null });
});

module.exports = router;
