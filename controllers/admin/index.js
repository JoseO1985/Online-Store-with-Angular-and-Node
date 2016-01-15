var passport = require('passport');
var models = require('../../models/store_model.js');
var express = require('express');

var router = express.Router();

router.get('/',function(req, res, next) {

		res.render('admin/login', {
			layout: 'main_general',
			user: req.user
		});

});

router.get('/login', function(req, res, next) {
	res.render('admin/login', {
		layout: 'main_general',
		user : req.user
	} );
});

router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return next(err)
		}
		if (!user) {
			return res.render('admin/login', {
				message: info.message,
				layout: 'main_general'
			});
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			res.redirect('/admin/products')
		});
	})(req, res, next);
});

router.get('/logout', function(req, res) {
	req.logOut();
	res.clearCookie('connect.sid', {path: '/'});
    res.redirect('/admin/login');
});

module.exports = router;