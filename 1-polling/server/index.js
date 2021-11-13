const express = require('express');
const { getFileContent } = require('../../utils');

const app = express();
const port = 3000;
const datafile = __dirname + '/../../data.txt';

app.get('/data', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.send(getFileContent(datafile));
})

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})