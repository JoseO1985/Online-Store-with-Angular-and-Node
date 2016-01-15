var models = require('../../models/store_model.js');
var express = require('express');
/*var check = require('../../config/isAuthenticated.js');*/
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

/* GET admin users. */
router.get('/',function(req, res, next) {

    models.Administrator.find({}, function(err, users) {
        if (err)
            console.log(err);
        else
            res.render('admin/users/', {
                layout: 'main_backend',
                title: "Gestión de Usuarios",
                users: users,
                active_item: "Users"
            });
    });
});

/* VIEW user. */
router.get('/view/:id', function(req, res, next) {
    var id = req.params.id;
    models.Administrator.findById(id, function(err, user) {
        if (err) throw err;

        res.render('admin/users/view', {
            user: user,
            layout: 'main_backend'
        });
    });
});


/* Show Create Form. */
router.get('/new',function(req, res, next) {

    res.render('admin/users/new', {
        layout: 'main_backend'
    });
});

/* Add User. */
router.post('/save', function(req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    var email    = req.body.email;
    var u = new models.Administrator({
        'username': username,
        'email': email
    });
    u.setPassword(password, function(err) {
        if (err)
            throw err;
        else {
            u.save();
            console.log('password reset successful');
            res.redirect('/admin/users');
            return;
        }

    });
});

/* Show Edit Form. */
router.get('/edit/:id', function(req, res, next) {
    var id = req.params.id;
    models.Administrator.findById(id, function(err, user) {
        if (err) throw err;

        res.render('admin/users/edit', {
            user: user,
            layout: 'main_backend'
        });
    });
});

/* Update User. */
router.post('/update',function(req, res, next) {

    models.Administrator.findByIdAndUpdate(req.body.id, req.body, function(err, user) {
        if (err) throw err;
        user.setPassword(req.body.password, function(err) {
            if (err)
                throw err;
            else {
                user.save();
                console.log('password reset successful');
                console.log('User updated successfully');              
            }
        });        
        res.redirect('/admin/users');
    });    
});

/* Delete User. */
router.get('/delete/:id',function(req, res, next) {

    models.Administrator.findByIdAndRemove(req.params.id, function(err) {
        if (err) throw err;

        console.log('User successfully deleted!');
        res.redirect('/admin/users');
    });
});

module.exports = router;