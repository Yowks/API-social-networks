const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  administrator: String,
  name: String,
  description: String,
  begin_date: Date,
  end_date: Date,
  location: {
    lat: Number,
    lon: Number
  },
  staff: [String],
  members: [String],
  privacy: Boolean,
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
