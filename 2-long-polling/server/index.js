const fs = require('fs');
const express = require('express');

const app = express();
const port = 3000;
const datafile = __dirname + '/../../data.txt';

function getFileLastModified(filename) {
  return fs.statSync(filename).mtime.getTime();
}

function getFileContent(filename) {
  return fs.readFileSync(filename, 'utf8');
}

function waitForFileChange(filename, version) {
  return new Promise((rs) => {
    const checkFileModified = () => {
      if (version < getFileLastModified(filename)) {
        rs();
      } else {
        setTimeout(checkFileModified, 50);
      }  
    }
    checkFileModified();
  })
}

app.get('/data', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  let { curVer = 0 } = req.query;
  await waitForFileChange(datafile, curVer);

  const data = getFileContent(datafile);
  res.send({ 
    content: data, 
    version: getFileLastModified(datafile)
  });
})

// app.get('/test', async (req, res) => {
//   res.send('working');
// });

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})