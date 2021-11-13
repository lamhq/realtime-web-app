const express = require('express');
const { waitForFileChange, getFileContent, getFileLastModified } = require('../../utils');

const app = express();
const port = 3000;
const datafile = __dirname + '/../../data.txt';

app.get('/data', async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')

  let { curVer = 0 } = req.query;
  await waitForFileChange(datafile, curVer);

  const data = getFileContent(datafile);
  res.send({ 
    content: data, 
    version: getFileLastModified(datafile)
  });
})

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})