const fs = require('fs');
const path = require('path');
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
//parse incoming data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
//tell the app to use the router when the client navigates to /api
app.use('/api', apiRoutes);
//if '/' is the endpoint, go back to the homepage
app.use('/', htmlRoutes);

//app.listen should always be last
app.listen(PORT, () =>
{
    console.log(`API server now on port ${PORT}!`);
});