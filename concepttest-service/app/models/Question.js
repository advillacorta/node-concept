// app/models/Question.js

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var AnswerSchema = new Schema({
	description: String,
	isCorrect: Boolean,
	score: Number
});

var QuestionSchema = new Schema({
	skillType: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SkillType'
	},
	skill: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Skill'
	},
	description: String,
	isMultipleChoice: Boolean,
	answers: [AnswerSchema]
},
{
	collection: 'Questions',
	timestamps: true
});

module.exports = mongoose.model('Question', QuestionSchema);