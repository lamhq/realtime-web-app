const fs = require('fs');
const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 3000 });
const datafile = __dirname + '/../../data.txt';

function sendData(ws) {
  const data = fs.readFileSync(datafile, 'utf8');
  ws.send(data);
  console.log(data);
}

wss.on('connection', (ws) => {
  console.log('connected');

  sendData(ws);

  fs.watch(datafile, 'utf8', (event) => {
    if (event === 'change') {
      console.log(`file changed`);
      setTimeout(() => sendData(ws), 10);
    }
  });
});