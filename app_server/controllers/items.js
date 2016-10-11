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
<<<<<<< HEAD

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
=======

var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};

// render home page
/*module.exports.homepage = function(req, res) {
	res.render('layout', {title: 'Comparonics'});
};
*/
var getItemInfo = function(req, res, callback) {
	var requestOptions, path;
	path = 'api/items/' + req.params.itemid;
	requestOptions = {
		url : apiOptions.server + path,
		method : 'GET',
		json : {}
	};
	
	request(
		requestOptions,
		function(err, res, body) {
			var data = body;
			if(res.statusCode === 200) {
				//data.model = body.model;
				callback(req, res, data);
			}else {
				_showError(req, res, res.statusCode);
			}
		});
};




>>>>>>> d06219603071c39cbaf4e84a9b1ff07fa0775f9d
