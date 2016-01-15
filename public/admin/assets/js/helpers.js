'use strict';

exports.isequal =  function(a, b, options) {
  if (a == b) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};


/*Handlebars.registerHelper('eq', function(a, b, options) {
  if (a == b) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});


exports.canDisplayDeal = function (options) {
                if (this.is_publish == 1 || this.is_publish == '1') {
                    return options.fn(this);
                } else {
                    return options.inverse(this);
                }
            };
*/