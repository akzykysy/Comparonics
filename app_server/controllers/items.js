//require request module to all files that needs to make API calls
var request = require('request');
//set default server URL for local development
var apiOptions = {
	server: 'https://localhost:3000'
};
//live address of application
if(process.env.NODE_ENV === 'production') {
	apiOptions.server = 'https://immense-springs-73590.herokuapp.com'
}

//How to call an API from Express, using the request module [Getting mean, p. 204], define the request options
var requestOptions = {
  //url : "http://yourapi.com/api/path",
  url : "https://localhost:3000",
  method : "GET",
  json : {}
  //qs : {
  //  offset : 20
  //}
};

//make request, sending through options, and supplying a callback function to use responses as needed
//request(options, callback), options=JavaScript object defining the request, callback=Function to run when a response is received
request(requestOptions, function(err, response, body) {
  if (err) {
    console.log(err);
  } else if (response.statusCode === 200) {
    console.log(body);
  } else {
    console.log(response.statusCode);
  }
});

var Products = require('../../app_api/models/items');

//homepage function
var renderHomepage = function(req, res){
  res.render('layout', {
    title: 'homepage'
  });
}

//homepage function
//var renderHomepage = function(req, res) {
	//res.render('layout');
//};

//home page controller updated to use API 
module.exports.homepage = function(req, res){
  var requestOptions, path;
  path = '/api/items';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      renderHomepage(req, res, body);
    }
  );
};

//home page controller
//module.exports.homepage = function(req, res) {
//	renderHomepage(req, res);
//};

//fetching input from user
module.exports.getSearch = function(req, res) {
	console.log(req.body.name);
	res.render('searchResult');
};

// all products
module.exports.productList = function(req, res) {
	Products
		.find()
		.where('price').gt(500).lt(800)
		.sort('price')
		//.limit(5)
		.exec(function(err, items) {
			if(err) throw err;
			res.json(items);
		});
};

//cheapSite
/*module.exports.cheapSiteList = function(req, res) {
	models.cheapSite.find({}, function(err, cheapSite) {
		if(err) throw err;
		
		res.json(cheapSite);
	});
};*/
