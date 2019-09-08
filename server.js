const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});

const app = express();

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/profile', require('./routes/profile'));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));

  app.get(/.*/, (req,res) => res.sendFile(__dirname + '/public/index.html'));
}

const port=process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on ${process.env.NODE_ENV} mode on port ${port}`);
});