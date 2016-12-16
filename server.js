const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const cors = require('cors');
const winston = require('winston');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const WebSocketServer = require('ws').Server;

const config = {
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT || 5000,
  bindIp: process.env.BIND_IP || '::1'
};

winston.level = 'debug';

MongoClient.connect(config.mongoUri, {server: {socketOptions: {keepAlive: 1}}}).then(db => {
  const asset = require('./routes/asset');
  const app = express()
    .use(morgan('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use(cors())
    .use('/asset', asset(db))
    .post('/ping', (req, res) => {
      app.wss.clients.forEach(c => c.send(JSON.stringify({type: 'MESSAGE', payload: {message: 'pong'}})));
      res.status = 204;
      res.send();
    });
  const server = http.createServer(app).listen(config.port, config.bindIp,
    () => winston.info(`Listening on port ${config.port}`));

  const wss = new WebSocketServer({server});
  wss.on('connection', (ws) => {
    ws.send(JSON.stringify({type: 'MESSAGE', payload: {message: 'Hello!'}}));
    ws.on('message', (data, flags) => {
      if (flags.binary) {
        return;
      }
      const message = JSON.parse(data);
      winston.info('Received web socket message', message)
    })
  });
  app.wss = wss;
});
