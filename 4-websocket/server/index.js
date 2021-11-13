const fs = require('fs');
const { WebSocketServer } = require('ws');
const { watchFileChange, getFileContent } = require('../../utils');

const wss = new WebSocketServer({ port: 3000 });
const datafile = __dirname + '/../../data.txt';

wss.on('connection', (ws) => {

  console.log('connected');

  // subscribe for file change
  const unSubscribe = watchFileChange(datafile, () => {
    ws.send(getFileContent(datafile));
  });
  
  ws.onclose = () => {
    console.log('disconnected');
    unSubscribe();
  };
});