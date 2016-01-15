var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 
  res.render('index',{layout:'main', title:'Librería La Era'});
 
});

module.exports = router;