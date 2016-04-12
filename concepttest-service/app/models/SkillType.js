// app/models/SkillType.js

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var SkillTypeSchema = new Schema({
	name: String,
	description: String
}, 
{ 
	collection : 'SkillTypes',
	timestamps: true
});


module.exports = mongoose.model('SkillType', SkillTypeSchema);