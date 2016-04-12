// app/models/Skill.js

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var SkillSchema = new Schema({
	name: String,
	description: String,
	type: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SkillType'
	}
},
{
	collection : 'Skills'
});

module.exports = mongoose.model('Skill', SkillSchema);