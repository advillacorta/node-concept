var express    = require('express');
var router     = express.Router();
var Position      = require('./../models/Position');

/*

*/
router.get('/', function(request, response)
{
    Position.find(function(error, positions)
    {
        if(error) { response.send(error); }
        response.status(200).json(positions);
    });
});

/*

*/
router.get('/:positionId', function(request, response)
{
    var id = request.params.positionId;
    Position.findById(id, function(error, position)
    {
        if(error) { response.send(error); }
        response.status(200).json(position);
    });
});

/*

*/
router.post('/', function(request, response)
{
    var position = new Position();
    position.name = request.body.name;
    position.description = request.body.description;
    position.overallGoal = request.body.overallGoal;
    position.specificGoal = request.body.specificGoal;
    
    position.skills = [];
    for(var i in request.body.skills)
    {
        var skill = request.body.skills[i];
        position.skills.push(skill);
    }
    position.save(function(error)
    {
        if(error) { response.send(error); }
        response.status(200).json({ message: 'Position created successfully.' });
    });
});

/*

*/
router.put('/:positionId', function(request, response)
{
    var id = request.params.positionId;
    Position.findById(id, function(error, position)
    {
        position.name = request.body.name;
        position.description = request.body.description;
        position.overallGoal = request.body.overallGoal;
        position.specificGoal = request.body.specificGoal;
        
        position.skills = [];
        for(var i in request.body.skills)
        {
            var skill = request.body.skills[i];
            position.skills.push(skill);
        }
        
        position.save(function(error)
        {
            if(error) { response.send(error); }
            response.status(200).json({ message: 'Position updated successfully.' });
        });
    });
});

/*

*/
router.delete('/:positionId', function(request, response)
{
    Position.remove({
        _id: request.params.positionId
    },
    function(error, position)
    {
        if(error) { response.send(error); }
        response.status(200).send({ message: 'Position delete successfully.' });
    }
    );
});

module.exports = router;