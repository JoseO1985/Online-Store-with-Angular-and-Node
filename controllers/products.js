var express = require('express');
var router = express.Router();

var models = require('../models/store_model.js');

/* GET users listing. */
router.get('/products', function(req, res, next) {
 models.Product.find({}, function (err, products) {
    if (!products){
      res.json(404, {msg: 'Products Not Found.'});
    } else {
      res.json(products);
    }
  });
});

router.get('/product/:id', function(req, res, next) {
    models.Product.findById(req.params.id, function (err,product){
	     if(!product)  
	     	res.json(404, {msg: 'Product Not Found.'});
	     else
       {
	     	res.json(product);
	     }
	 });
});

router.get('/cart', function(req, res, next) {
    if(req.session.cart && req.session.cart.length != 0){
        console.log(req.session.cart);
        res.json(req.session.cart);
    }
    else
        res.json([]);
});

router.post('/update/cart', function(req, res, next) {
          req.session.cart = req.body.updatedCart;
          res.json(req.session.cart);
/*      models.Customer.update({ userid: 'customerA' }, 
      {$set:{cart:req.body.updatedCart}}, function(err,customer){
        if (err || customer < 1){
          res.json(404, {msg: 'Failed to update Cart.'});
      } else {
          res.json({msg: "Customer Cart Updated"});
      }   
      });*/
});

module.exports = router;