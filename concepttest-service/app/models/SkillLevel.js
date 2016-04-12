// app/models/SkillLevel.js

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var SkillLevelSchema = new Schema (
{
	name: String,
	description: String,
	min: Number,
	max: Number,
	skill: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Skill'
	}
},
{
	collection: 'SkillLevels'
});

module.exports = mongoose.model('SkillLevel', SkillLevelSchema);