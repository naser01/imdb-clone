require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const morgan = require('morgan');


const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 5000);

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Mongodb database connection established successfully');
});


const dev = app.get('env') !== 'production';

if (!dev) {
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
  app.use('*', express.static(path.resolve(__dirname, '..', 'client', 'build')));
  app.get('*', (res, req) => {
    res.send(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

if (dev) {
  app.use(morgan('dev'))
}


/** 
// Static file declaration
app.use(express.static(path.join(__dirname, "../client/build")));

// production mode
if (process.env.NODE_ENV === "production") {
app.use(express.static("../client/build"));
app.use('*', express.static(path.resolve(__dirname, "../client/build")));
app.get('*', (res, req) => {
  res.send(path.resolve(__dirname, '../client/build/index.html'))
})

}*/

const signupRoute = require('./routes/signin-out')
const movieRoute = require('./routes/movies')

app.use('/account', signupRoute)
app.use('/movies', movieRoute)

app.listen(PORT, () => console.log(`Server is starting on PORT ${PORT}`));



/**
app.get('*', (req, res) => {
  res.send(path.join(__dirname, '..', 'client', 'public', 'index.html'))
})*/


/**
if (!dev) {
  app.use(express.static(path.resolve(__dirname, '../client/build')));
  app.use('*', express.static(path.resolve(__dirname, '../client/build')));
  app.get('*', (res, req) => {
    res.send(path.resolve(__dirname, 'build', 'client/build/index.html'))
  })
}

if (dev) {
  app.use(morgan('dev'))
}*/
