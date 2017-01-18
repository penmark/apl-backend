const Router = require('express').Router;
const ObjectId = require('mongodb').ObjectId;

module.exports = (db) => {
  const collection = db.collection('asset');
  return Router()
    .get('/', (req, res, next) => {
      // Promise api
      collection.find()
        .sort({title: 1})
        .toArray()
        .then(result => {
          res.send(result.map(asset => Object.assign({}, asset, {
              assetId: asset._id,
              frameRate: asset.frame_rate,
              fileSize: asset.file_size,
              dropFrame: typeof asset.tim !== 'undefined'
          })))
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
          res.status = 204;
          res.send()
        })
    })
    .param('_id', (req, res, next, _id) => {
      try {
        req._id = ObjectId.createFromHexString(_id)
      } catch (err) {
        err.status = 400;
        next(err)
      }
      next()
    });
};
