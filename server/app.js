const express = require('express');
const app = express();
const formsRouter = require('./routes/formsRoutes');

app.use(express.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/forms-generator', formsRouter);

module.exports = app;
