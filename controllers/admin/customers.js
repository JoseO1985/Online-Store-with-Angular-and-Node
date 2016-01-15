var models = require('../../models/store_model.js');
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
  res.render('admin/users', { layout: 'main_backend', active_item:"Users"});
});

/* GET customers. */
router.get('/', function(req, res, next) {
  
  models.Product.find({}, function (err, products) {
  	if(err)
		console.log(err);
	 else 
		res.render('admin/products/',{layout:'main_backend', products:products, active_item:"Products"});
  });
}); 

module.exports = router;