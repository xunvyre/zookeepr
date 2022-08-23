const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/animals', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers', (req, res) =>
{
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

//wildcard route to catch invalid requests and send them back to the homepage (this should always come last)
router.get('*', (req, res) => 
{
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;