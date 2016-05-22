// app/models/Test.js

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TestSchema = new Schema({
	name: String,
	type: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'TestType'
	},
	isActive: Boolean,
	questions: ['Question']
},
{
	collection: 'Tests',
	timestamps: true
});

module.exports = mongoose.model('Test', TestSchema);