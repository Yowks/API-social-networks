const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  administrator: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String, required: true},
  begin_date: {type: Date, required: true},
  end_date: {type: Date, required: true},
  location: {
    lat: {type: Number, required: true},
    lon: {type: Number, required: true}
  },
  staff: [String],
  members: [String],
  privacy: {type: Boolean, required: true},
  image_event: {
    type: String,
    default: 'https://pbs.twimg.com/profile_images/1126137112825335808/L5WvNz8W_400x400.jpg'
  }
}, {
  collection: 'events',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
