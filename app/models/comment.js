const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    type: {type: String, required: true},
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    photo_id: {type: String, required: true},
    content: String,
    date_creation: { type: Date, default: Date.now },
    content_modified: { type: String, default: null },
    date_modified: { type: Date, default: null },
    enable: { type: Boolean, default: 1 }
}, {
    collection: 'comments',
    minimize: false,
    versionKey: false,
}).set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
    }
})

module.exports = Schema