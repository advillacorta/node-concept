// app/models/Position.js

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PositionSchema = new Schema({
   name: String,
   description: String,
   overallGoal: String,
   specificGoal: String,
   skills: [{ 
       skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' },
       skillLevel : { type: mongoose.Schema.Types.ObjectId, ref: 'SkillType' }
   }]
},
{
    collection: 'Positions',
    timestamps: true
});

module.exports = mongoose.model('Position', PositionSchema);