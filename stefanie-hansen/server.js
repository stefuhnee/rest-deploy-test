'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const plantRouter = require('./route/plant-routes');
const supplementRouter = require('./route/supplement-routes');
const mongoose = require('mongoose');
const morgan = require('morgan');

const dbPort = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';
mongoose.connect(dbPort);

app.use(morgan('dev'));
app.use(jsonParser);
app.use('/plants', plantRouter);
app.use('/supplements', supplementRouter);

app.use((err, req, res, next) => {
  res.send('Error: ', err.message);
  next(err);
});

app.all('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('listening on ' + process.env.PORT || '3000');
});
