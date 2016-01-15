var express = require('express');
var router = express.Router();

var models = require('../models/store_model.js');


router.post('/add', function(req, res, next) {
          
      if(req.session.user){

          // console.log(req.body.shipping[0]);
          // console.log(req.body.billing[0]);
          // console.log(req.body.cart);
          // console.log('/////////////////////');

          var orderShipping = new models.Address(req.body.shipping[0]);
          var orderBilling = new models.Billing(req.body.billing[0]);
          orderBilling.address = req.body.billing[0].address[0];
          var orderItems = req.body.cart;

          // console.log(orderShipping);
          // console.log(orderBilling);
          // console.log(orderItems);
          
          var newOrder = new models.Order({userid: req.session.user.local.username,
                              items: orderItems, shipping: orderShipping, 
                              billing: orderBilling});
          newOrder.save(function(err, results){
            if(err){
              res.json(500, "Failed to save Order."+err);
            } else {
              req.session.cart = [];
              req.session.user.cart = [];
              //console.log("vaciado1 del carrito en el order" + req.session.user.cart);
              //console.log("vaciado2 del carrito en el order" + req.session.cart);
              res.json({msg: "Order Saved."});
              /*models.Customer.update({ 'local.username': req.session.user.local.username }, 
                  {$set:{cart:[]}})
              .exec(function(err, results){
                if (err || results < 1){
                 res.json(404, {msg: 'Failed to update Cart.'});
                } else {
                 res.json({msg: "Order Saved."});
                }
              });*/
            }
          });
      }
      else
        res.json(401, {msg: 'Invalid Credentials'});

});

router.get('/orders', function(req, res, next){
  if(req.session.user){
       models.Order.find({userid: req.session.user.local.username}).sort({'timestamp': -1})
      .exec(function(err, orders) {
        if (!orders){
          res.json(404, {msg: 'Orders Not Found.'});
        } else {
          res.json(orders);
        }
      });
  }
  else
    res.json(401, {msg: 'Invalid Credentials'});
});

router.post('/test',function(req, res, next){
  console.log(req.body);
});

module.exports = router;