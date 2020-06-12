const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const { createServer } = require('http')
const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../', 'client', 'public')));
app.use('*', express.static(path.resolve(__dirname, '../', 'client', 'public')));
app.get('*', (req, res) => {
    res.send(path.resolve(__dirname, '../', 'client', 'public', 'index.html'))
})


/**
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongodb database connection established successfully');
}); */

const server = createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})