var express=require('express');

//configure routes

var router=express.Router();
var models = require('../models/store_model.js');



router.post('/login', function(req,res,next){
	  var email = req.body.email || '';
    var password = req.body.password || '';
    
    if (email == '' || password == '') {
      console.log("Invalid credentials");
      res.json(401, {msg: 'Invalid credentials.'});
      return;
    }

    models.Customer.findOne({'local.username': email}, function (err, customer) {
        if (err) {
            console.log(err);
            res.json(401);
            return;
        }

        if(!customer){
            console.log("No user found");
            res.json(401, {msg: 'No user found.'});
            return;
        }
 
        customer.verifyPassword(password, function(isMatch) {
            if (!isMatch) {
                console.log("Attempt failed to login with " + customer.local.username);
                res.json(401, {msg: 'Attempt failed to login with ' + customer.local.username});
                return;
            }
            
            req.session.user = customer;
            req.session.user.cart = req.session.cart;
            res.json({customer:req.session.user});
        });
 
    });
});

router.post('/signup', function(req,res,next){
    var email = req.body.email || '';
    var password = req.body.password || '';
 
    if (email == '' || password == '') {
      console.log("Invalid credentials");
      res.json(401, {msg: 'Invalid credentials.'});
      return;
    }

    models.Customer.findOne({'local.username': email}, function (err, customer) {
        if (err) {
            console.log(err);
            res.json(401);
            return;
        }

        if(customer){
            console.log("Email already taken");
            res.json(401, {msg: 'Email already taken.'});
            return;
        }

        
        
      var c = new models.Customer({'shipping': [],
                                   'billing':[],
                                //   'cart': [],
                                   'local.username':email,
                                   'local.password':password});
      
      c.save(function(err) {
            if (err) throw err;
            console.log('Customer saved successfully!');
      });

        req.session.user = c;
        req.session.user.cart = req.session.cart;
        res.json({customer:req.session.user}); 
    });
});


router.get('/logout', function(req, res, next){
    req.session.destroy();
    res.clearCookie('connect.sid', {path: '/'});
    res.json({});
});


router.get('/checkSignin', function(req, res, next){
    if(req.session.user){
       req.session.user.cart = req.session.cart;
	     res.json({customer:req.session.user});
     }
     else
       res.json('0');
});

module.exports = router;

