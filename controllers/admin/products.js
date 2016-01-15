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

/* GET products. */
router.get('/',function(req, res, next) {

  	models.Product.find({}, function (err, products) {
  	if(err)
		console.log(err);
	 else 
		res.render('admin/products/',{layout:'main_backend',title:"Gestión de Productos", products:products, active_item:"Products"});
   });
  	
}); 

/* VIEW product. */
router.get('/view/:id', function(req, res, next) {

   var id = req.params.id;
   models.Product.findById(id, function(err,product){
     if(err) throw err;
   
     res.render('admin/products/view', {product:product, layout: 'main_backend' });
   });
}); 

/* Show Create Form. */
router.get('/new', function(req, res, next) {

     res.render('admin/products/new', { layout: 'main_backend' });
});

/* Add Product. */
router.post('/save', function(req, res, next) {

	 var price = req.body.price;
	 var description = req.body.description;
	 var imagefile = req.body.imagefile;
	 var instock = req.body.instock;
	 var name = req.body.name;

	 var p = new models.Product({name,imagefile,description,price,instock});
	 p.save(function(err) {
	  if (err) {/*throw err*/
	  		res.render('admin/products/new', { layout: 'main_backend', error:'Ha ocurrido un error' });
	  }

	  else
	  {
	  	   console.log('Product saved successfully!');
	       res.redirect('/admin/products');
	  }
	 });

});

/* Show Edit Form. */
router.get('/edit/:id',function(req, res, next) {

	 var id = req.params.id;
	 models.Product.findById(id, function(err,product){
	     if(err) throw err;
	   
	     res.render('admin/products/edit', {product:product, layout: 'main_backend' });
	 });

});

/* Update Product. */
router.post('/update',function(req, res, next) {

	 models.Product.findByIdAndUpdate(req.body.id, req.body, function(err,product){
		    if(err){ /*throw err;*/
		    	models.Product.findById(req.body.id, function(err,product){
	    		     res.render('admin/products/edit', {product:product, layout: 'main_backend', error:'Ha ocurrido un error' });
	    		 });
		    }
		    else{
		     console.log('product updated successfully'); 
		     res.redirect('/admin/products');
		   }
    }); 

});

/* Delete Product. */
router.get('/delete/:id', function(req, res, next) {

	 models.Product.findByIdAndRemove(req.params.id, function(err) {
		if (err) throw err; 
		
		console.log('Product successfully deleted!');
		res.redirect('/admin/products');
	}); 

});

module.exports = router;