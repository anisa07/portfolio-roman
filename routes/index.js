var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('../public/index.html');
});
// router.get('/about', function(req, res, next) {
//     res.render('index.html');
// });
// router.get('/projects', function(req, res, next) {
//     res.render('index.html');
// });
// router.get('/contacts', function(req, res, next) {
//     res.render('index.html');
// });
// router.get('/events', function(req, res, next) {
//     res.render('index.html');
// });

module.exports = router;