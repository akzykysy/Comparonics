var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;
	ObjectId = Schema.ObjectId;

var userSchema = new Schema({
	username: {type: String, required: true},
	password: {type: String, required: true}
});


var productSchema = new Schema({
	brand: {type: String, required: true},
	type: {type: String, required: true},
	model: {type: String, required: true},
	price: {type: Number, required: true},
	storeName: {type: String, required: true},
	keywords: []
});


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Product', productSchema, 'products');



/*var users = mongoose.model('User', userSchema, 'users');
var ebay = mongoose.model('Ebay', storeSchema, 'ebay');
var thisStore = mongoose.model('ThisStore', storeSchema, 'thisStore');
var cheapSite = mongoose.model('CheapSite', storeSchema, 'cheapSite');


module.exports = {
	users: users,
	ebay: ebay,
	thisStore: thisStore,
	cheapSite: cheapSite
};*/

