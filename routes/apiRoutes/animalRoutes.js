const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');
const router = require('express').Router();

router.get('/animals', (req, res) =>
{
    let results = animals;
    if (req.query)
    {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/animals/:id', (req, res) =>
{
    const result = findById(req.params.id, animals);
    if (result)
    {
        res.json(result);
    }
    else //send 404 error if result isn't found
    {
        res.send(404);
    }
});

router.post('/animals', (req, res) =>
{
    //set id based on what the next index of the array will be
    req.body.id = animals.length.toString();
    //if any data is incorrect, send error
    if(!validateAnimal(req.body))
    {
        res.status(400).send('The input is not properly formatted.');
    }
    else
    {
        //add animal to JSON file and animals array
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

module.exports = router;