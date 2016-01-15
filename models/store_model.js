var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
mongoose.connect('mongodb://127.0.0.1/storedb');

var AddressSchema = new Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  zip: String
}, { _id: false });

var Address = mongoose.model('Address', AddressSchema);

var BillingSchema = new Schema({
  cardtype: { type: String, enum: ['Visa', 'MasterCard', 'Amex'] },
  name: String,
  number: String,
  expiremonth: Number,
  expireyear: Number,
  address: [AddressSchema]
}, { _id: false });

var Billing = mongoose.model('Billing', BillingSchema);

var ProductSchema = new Schema({
  name: String,
  imagefile: String,
  description: String,
  price: Number,
  instock: Number
});

var Product = mongoose.model('Product', ProductSchema);

/*var p = new Product({
  name: 'Chris',
  imagefile: 'sevilayha',
  description: 'password',
  price:123,
  instock:123
});

p.save(function(err) {
  if (err) throw err;

  console.log('Product saved successfully!');
});*/

var ProductQuantitySchema = new Schema({
  quantity: Number,
  product: [ProductSchema]
}, { _id: false });

var ProductQuantity = mongoose.model('ProductQuantity', ProductQuantitySchema);

var OrderSchema = new Schema({
  userid: String,
  items: [ProductQuantitySchema],
  shipping: [AddressSchema],
  billing: [BillingSchema],
  status: {type: String, default: "Pending"},
  timestamp: { type: Date, default: Date.now }
});

var Order = mongoose.model('Order', OrderSchema);

var CustomerSchema = new Schema({
  shipping: [AddressSchema],
  billing: [BillingSchema],
 // cart: [ProductQuantitySchema],
  local:{
    username: { //userid
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }
});

CustomerSchema.pre('save', function(callback) {
  var customer = this;

  // Break out if the password hasn't changed
  if (!customer.isModified('local.password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(customer.local.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      customer.local.password = hash;
      callback();
    });
  });
});


CustomerSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.local.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(isMatch);
  });
};

var Customer = mongoose.model('Customer', CustomerSchema);


/*var shipping = new Address({
        name: 'Customer A',
        address: 'Somewhere',
        city: 'My Town',
        state: 'CA',
        zip: '55555'
      });
      var billing = new Billing({
        cardtype: 'Visa',
        name: 'Customer A',
        number: '1234567890',
        expiremonth: 1,
        expireyear: 2020,
      });
      var customer = new Customer({
        userid: 'customerA',
        shipping: shipping,
        billing: billing,
        cart: []
      });

      customer.save(function(err) {
        if (err) throw err;
          console.log('Customer saved successfully!');
      });*/


var AdministratorSchema = new Schema({
  email:String,
  date:Date
});

AdministratorSchema.plugin(passportLocalMongoose);

var Administrator = mongoose.model('Administrator', AdministratorSchema);

module.exports = {
    Address: Address,
    Billing: Billing,
    Product: Product,
    Customer: Customer,
    Order: Order,
    Administrator: Administrator
};