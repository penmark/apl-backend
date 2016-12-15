const MongoClient = require('mongodb').MongoClient
const express = require('express')
const cors = require('cors')
const winston = require('winston')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const ObjectId = require('mongodb').ObjectId
const http = require('http')

const config = {
    mongoUri: process.env.MONGO_URI,
    mongoCollection: process.env.MONGO_COLLECTION
}

let db, collection; 
winston.level = 'debug'

MongoClient.connect(config.mongoUri, {server: {socketOptions: {keepAlive: 1}}})
.then(_db => {
    db = _db;
    collection = db.collection(config.mongoCollection)
})

const asset = express.Router()
    .get('/', (req, res, next) => {
        // Promise api
        collection.find()
        .sort({title: 1})
        .toArray()
        .then(result => {
            console.log(result); 
            res.send(result)
        })
        .catch(err => next(err))
    })
    .get('/:_id', (req, res) => {
        // Callback api
        collection.findOne({_id: req._id}, (err, result) => {
            if (err) {
                return next(err)
            }
            res.send(result);
        })
    })
    .delete('/:_id', (req, res) => {
       collection.deleteOne({_id: req._id})
       .then(result => {
           res.status = 204
           res.send()
       })
    })
    .param('_id', (req, res, next, _id) => {
        try {
            req._id = ObjectId.createFromHexString(_id)
        } catch (err) {
            err.status = 400
            next(err)
        }
        next()
    })

const app = express()
    .use(morgan('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use(cors())
    .use('/asset', asset)

http.createServer(app).listen(5000, '::1')
.on('listen', () => winston.info('Listening on port 5000'))

