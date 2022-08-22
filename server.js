const express = require('express');
const { animals } = require('./data/animals');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

//parse incoming data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());

function filterByQuery(query, animalsArr)
{
    let personalityTraitsArr = [];
    let filteredResults = animalsArr;
    if (query.personalityTraits)
    {
        //save personalityTraits as an array
        //if string, place into array and save
        if (typeof query.personalityTraits === 'string')
        {
            personalityTraitsArr = [query.personalityTraits];
        }
        else
        {
            personalityTraitsArr = query.personalityTraits;
        }
        //loop through the array to find matching traits
        personalityTraitsArr.forEach(trait =>
        {
            filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) !== -1);
        });
    }
    if (query.diet)
    {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species)
    {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name)
    {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

function findById(id, animalsArr)
{
    const result = animalsArr.filter(animal => animal.id === id)[0];
    return result;
};

function createNewAnimal(body, animalsArr)
{
    const animal = body;
    animalsArr.push(animal);
    fs.writeFileSync
    (
        path.join(__dirname, './data/animal.json'),
        JSON.stringify({ animals: animalsArr }, null, 2)
    );
    return animal;
};

function validateAnimal (animal)
{
    if (animal.name || typeof animal.name !== 'string')
    {
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string')
    {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string')
    {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits))
    {
        return false;
    }
    return true;
};

app.get('/api/animals', (req, res) =>
{
    let results = animals;
    if (req.query)
    {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});
app.get('/api/animals/:id', (req, res) =>
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
app.post('/api/animals', (req, res) =>
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
        res.json(req.body);
    }
});
app.listen(PORT, () =>
{
    console.log(`API server now on port ${PORT}!`);
});

'http://localhost:3001/api/animals'