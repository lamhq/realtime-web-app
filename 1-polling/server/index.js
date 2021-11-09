const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.get('/data', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const data = fs.readFileSync(__dirname + '/data.txt');
  res.send(data);
})

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})