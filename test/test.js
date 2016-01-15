var expect = require("chai").expect;
var request = require("request");

console.log("Tests...");

describe("Site alived, products and login:", function() {
    
    var url_home = "http://localhost:3000";
    
    describe("Site alived", function() {
        
        it("return status 200 OK", function(done) {
            request(url_home, function(err, response, body) {
                expect(response.statusCode).to.equal(200);   
                done();
            });
        });
        
        it("products succesfully loaded", function(done) {
            request(url_home+'/apiproducts/products',function(error, response, body){
                var parsed = JSON.parse(body);
                //console.log(parsed[0]);
                expect(parsed[0]).have.property('_id');
                done();
            });
                
        });
                
        it("login succesfully!", function(done) {
            request.post({url: url_home+'/apiauth/login', form: {email : '123@gmail.com', password : '123'}}, function (error, response, body) {
                var parsed = JSON.parse(body);
                //console.log(parsed.customer.local.username);
                expect(parsed.customer.local.username).to.equal('123@gmail.com');
                done();
            });
        });  

        it("logout succesfully!", function(done) {
            request(url_home+'/apiauth/logout', function (error, response, body) {
               // console.log(body);
                expect(body).to.equal('{}');
                done();
            });
        });         
    });
});



