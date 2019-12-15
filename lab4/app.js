var express = require('express');
var cors = require('cors');

var weatherRouter = require('./routes/weather');
var favouritesRoute = require('./routes/favourites');

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/weather', weatherRouter);
app.use('/favourites', favouritesRoute);

const port = 8001;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;