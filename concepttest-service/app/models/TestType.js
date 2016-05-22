// app/models/TestType.js

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TestTypeSchema = new Schema({
	name: String
},
{
	collection: 'TestTypes',
	timestamps: true
});

module.exports = mongoose.model('TestType', TestTypeSchema);