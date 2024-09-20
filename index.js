const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4000;

// const router = require('./app/routes/routes');
const app = express();

app.listen(port);
app.use(bodyParser.json());
app.use((req, res, next) => {
  // console.log("REQ", req)
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  app.use(cors());
  next();
});

// app.use('/', router);
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

console.log('Message RESTful API server started on: ' + port);
