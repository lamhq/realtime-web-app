const fs = require('fs');
const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 3000 });
const datafile = __dirname + '/../../data.txt';

let lastMod;

function watchFileChange(filename, cb) {
  const mtime = fs.statSync(filename).mtime;
  if (!lastMod || lastMod.getTime() !== mtime.getTime()) {
    lastMod = mtime;
    cb();
  }
  setTimeout(() => watchFileChange(filename, cb), 50);
}

function sendData(ws, filename) {
  const data = fs.readFileSync(filename, 'utf8');
  ws.send(data);
  console.log(data);
}

wss.on('connection', (ws) => {
  console.log('connected');
  watchFileChange(datafile, () => sendData(ws, datafile));
});