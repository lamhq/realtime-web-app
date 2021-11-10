const fs = require('fs');
const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws) => {
  console.log('connected');

  setInterval(() => {
    const data = fs.readFileSync(__dirname + '/../../data.txt');
    ws.send(data);
  }, 1000);
});