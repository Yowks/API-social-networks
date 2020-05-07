const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  name: String,
  description: String,
  administrator: String,
  members: [String],
  group_type: {type: String, enum: ['public', 'private', 'secret'], default: 'public'},
  post_authorization : {type: Boolean, default: 1},
  events_authorization : {type: Boolean, default: 1},
  icone: {
    type: String,
    default: 'https://pbs.twimg.com/profile_images/1126137112825335808/L5WvNz8W_400x400.jpg'
  },
  cover: {
    type: String,
    default: 'https://cultivatedculture.com/wp-content/uploads/2019/05/Chromatic-LinkedIn-Cover-Photo-Background.png'
  }
}, {
  collection: 'groups',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
