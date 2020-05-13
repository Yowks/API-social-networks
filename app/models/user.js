const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  first_name: {type: String,required: true},
  last_name: {type: String,required: true},
  email: {type: String, unique:true, required: true},
  password: {type: String,required: true},
  age: {type: Number,required: true},
  city: {type: String,required: true},
  city_code: {type: Number,required: true},
  street_number: {type: String,required: true},
  street_type: {type: String,required: true},
  street_name: {type: String,required: true},
  phone: {type: String,required: true},
  image_profil: {
    type: String,
    default: 'https://pbs.twimg.com/profile_images/1126137112825335808/L5WvNz8W_400x400.jpg'
  }
}, {
  collection: 'users',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
