var express = require('express');
var cors = require('cors');
var router = express.Router();

router.get('/', cors(), function (req, res, next) {
	res.render('index', {
		title: 'socket-test'
	});
});

module.exports = router;