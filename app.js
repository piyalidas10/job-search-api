// const http = require('http');  /* needed for nodejs only */
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const port = process.env.PORT || '3000';

const homeRouter = require('./routes/home');
const searchRoute = require('./routes/search');
const errorRouter = require('./routes/error');
const rootDir = require('./util/path');

/* for run nodejs only */
// const server = http.createServer(app);
// server.listen(3000);


// Body parser middleware
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.text()); // allows bodyParser to look at raw text
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json


// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(homeRouter);
app.use(searchRoute);
app.use(errorRouter);


/* for run nodejs with express js */
app.listen(port);