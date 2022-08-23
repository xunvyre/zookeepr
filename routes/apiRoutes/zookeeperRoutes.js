const { filterByQuery, findById, createNewKeeper, validateKeeper } = require('../../lib/zookeepers');
const { zookeepers } = require('../../data/zookeepers');
const router = require('express').Router();

router.get('/zookeepers', (req, res) =>
{
    let results = zookeepers;
    if (req.query)
    {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/zookeepers/:id', (req, res) =>
{
    const result = findById(req.params.id, zookeepers);
    if (result)
    {
        res.json(result);
    }
    else //send 404 error if result isn't found
    {
        res.send(404);
    }
});

router.post('/zookeepers', (req, res) =>
{
    //set id based on what the next index of the array will be
    req.body.id = zookeepers.length.toString();
    //if any data is incorrect, send error
    if(!validateKeeper(req.body))
    {
        res.status(400).send('The input is not properly formatted.');
    }
    else
    {
        //add keeper to JSON file and keepers array
        const zookeeper = createNewKeeper(req.body, zookeepers);
        res.json(zookeeper);
    }
});

module.exports = router;