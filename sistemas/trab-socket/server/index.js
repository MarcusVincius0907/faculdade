const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path')
const fs = require('fs')
let db = require('./db.json')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

function add(client){
  db.data.push(client);
  updateDB(db);
  return db.data;
}

function list(){
  return db.data;
}

function updateDB(db){
  let newDb = JSON.stringify(db);
  fs.writeFile('./server/db.json', newDb, 'utf8', (err) => {console.log(err);} );
}

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('add', (client) => {
    console.log('receive client', client);
    io.emit("addStatus", {status: 'success', data:add(client)})
  })
  socket.on('list', (client) => {
    console.log('wanna list');
    io.emit('listStatus', {data:list()})
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});