var express = require('express');
var router = express.Router();

var models = require('../models/store_model.js');


router.post('/update', function(req, res, next) {
          
        if(req.session.user){

          var newBilling = new models.Billing(req.body.updatedBilling[0]);
          newBilling.address = req.body.updatedBilling[0].address[0];
          models.Customer.update({ 'local.username': req.session.user.local.username }, 
              {$set:{billing:[newBilling.toObject()]}})
          .exec(function(err, results){
            if (err || results < 1){
             res.json(404, {msg: 'Failed to update Billing.'});
            } else {
             req.session.user.billing = req.body.updatedBilling;
          //   console.log(req.session.user);
             res.json({msg: "Customer Billing Updated"});
            }
          });
        }
        else
          res.json(401, {msg: 'Invalid Credentials'});

});

module.exports = router;