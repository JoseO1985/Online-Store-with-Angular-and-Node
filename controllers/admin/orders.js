var express = require('express');

var router = express.Router();

router.use(function(req, res, next){
	if(!req.user)
		res.redirect('/admin/login');
	else 
	{
        res.locals.user = req.user;
		next();
	}
});


router.get('/', function(req, res, next) {
  res.render('admin/orders/', { layout: 'main_backend', active_item:"Orders"});
});

module.exports = router;