const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
    immutable: true
  },
  author : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {type: String, required: true},
  creation_date: { type: Date, default: Date.now, required: true },
  comment: { type: Boolean, default: 1, required: true},
}, {
  collection: 'albums',
  minimize: false,
  versionKey: false,
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
  }
})

module.exports = Schema