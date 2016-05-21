// app/models/Customer.js

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var EmployeeSchema = new Schema({
	name: String,
	paternalLastName: String,
	maternalLastName: String,
	birthdate: Date,
	phoneNumber: String,
	cellphoneNumber: String,
	email: String,
	gender: String,
	documentNumber: String,
	documentType: String,
	isAssigned: Boolean,
	skills: [
		{
			skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
			currentScore: Number
		}
	]
},
{
	collection: 'Employees',
	timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);