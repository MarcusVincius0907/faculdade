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

function remove(clienteName){
  db.data = db.data.filter(el => el.nome != clienteName);
  updateDB(db);
  return db.data;

}

async function updateDB(db){
  let newDb = JSON.stringify(db);
  try{
    
    await new Promise((res, rej) => {
      setTimeout(() => {
        fs.writeFile('./server/db.json', newDb, 'utf8', (err) => {
          if(err){
            console.log('error saving file', err);
          }
        } );
        res(true);
      });
    }) 
    
  
  }catch(e){
    console.log('error saving data in db');
  }
}

function startSocket(){
  try{
    io.on('connection', (socket) => {
      console.log('a user connected');
      socket.on('add', (client) => {
        console.log('receive client', client);
        io.emit("addStatus", {status: 'success', data:add(client)})
      })
      socket.on('list', (client) => {
        console.log('wanna list');
        io.emit('listStatus', {status: 'success',data:list()})
      })
      socket.on('remove', (client) => {
        console.log('wanna remove', client);
        io.emit('removeStatus', {status: 'success', data:remove(client.data)});
      })
    });
  }catch(e){
    console.log(e);
    startSocket()
  }
}

startSocket()

server.listen(3000, () => {
  console.log('listening on *:3000');
});