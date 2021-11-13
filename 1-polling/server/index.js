const fs = require('fs');
const express = require('express');

const app = express();
const port = 3000;
const datafile = __dirname + '/../../data.txt';

function sendData(res, filename) {
  const data = fs.readFileSync(filename, 'utf8');
  res.send(data);
  console.log(data);
}

app.get('/data', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  sendData(res, datafile);
})

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})