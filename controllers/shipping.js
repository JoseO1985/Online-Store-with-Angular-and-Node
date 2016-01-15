var express = require('express');
var router = express.Router();

var models = require('../models/store_model.js');


router.post('/update', function(req, res, next) {
          
        //console.log(req.body.updatedShipping);
        if(req.session.user){

          var newShipping = new models.Address(req.body.updatedShipping[0]);
          models.Customer.update({ 'local.username': req.session.user.local.username }, 
              {$set:{shipping:[newShipping.toObject()]}})
          .exec(function(err, results){
            if (err || results < 1){
             res.json(404, {msg: 'Failed to update Shipping.'});
            } else {
             req.session.user.shipping = req.body.updatedShipping;
          //   console.log(req.session.user);
             res.json({msg: "Customer Shipping Updated"});
            }
          });
        }
        else
          res.json(401, {msg: 'Invalid Credentials'});

});

module.exports = router;