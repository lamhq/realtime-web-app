const fs = require('fs');
const { WebSocketServer } = require('ws');
const { watchFileChange } = require('../../utils');

const wss = new WebSocketServer({ port: 3000 });
const datafile = __dirname + '/../../data.txt';

function sendData(ws, filename) {
  const data = fs.readFileSync(filename, 'utf8');
  ws.send(data);
  console.log(data);
}

wss.on('connection', (ws) => {
  console.log('connected');
  watchFileChange(datafile, () => sendData(ws, datafile));
});