const fs = require('fs');
const path = require('path');

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
};

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
        path.join(__dirname, '../data/animals.json'),
        JSON.stringify({ animals: animalsArr }, null, 2)
    );
    return animal;
};

function validateAnimal(animal)
{
    if (!animal.name || typeof animal.name !== 'string')
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

module.exports = { filterByQuery, findById, createNewAnimal, validateAnimal };