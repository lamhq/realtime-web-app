const express = require('express');
const { watchFileChange, getFileContent } = require('../../utils');

const app = express();
const port = 3000;
const datafile = __dirname + '/../../data.txt';

app.get('/data', async (req, res) => {
  console.log('start sending event');
  
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Cache-Control', 'no-cache');

  // subscribe for file change
  const unSubscribe = watchFileChange(datafile, () => {
    res.write(`data: ${getFileContent(datafile)}\n\n`);
  });

  // If client closes connection, stop sending events
  res.on('close', () => {
    console.log('stop sending event');
    unSubscribe();
    res.end();
  });

})

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})