// app/models/Customer.js

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CustomerSchema = new Schema({
	name: String,
	address: String,
	phoneNumber: String,
	isActive: Boolean
},
{
	collection: 'Customers',
	timestamps: true
});

module.exports = mongoose.model('Customer', CustomerSchema);