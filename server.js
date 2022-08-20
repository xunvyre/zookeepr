const express = require('express');
const { animals } = require('./data/animals');
const PORT = process.env.PORT || 3001;
const app = express();

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
app.get('/api/animals', (req, res) =>
{
    let results = animals;
    if (req.query)
    {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});
app.listen(PORT, () =>
{
    console.log(`API server now on port ${PORT}!`);
});
'http://localhost:3001/api/animals'