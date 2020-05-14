const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    type: {type: String, enum: ['group_message', 'event_message', 'photo_message'], required: true},
    creation_date: { type: Date, default: Date.now, required: true },
}, {
    collection: 'discussions',
    minimize: false,
    versionKey: false,
}).set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
    }
})

module.exports = Schema