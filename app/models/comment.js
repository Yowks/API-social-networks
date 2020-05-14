const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    type: {type: String, required: true, immutable: true},
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ref: {type: String, required: true, immutable: true},
    content: String,
    date_creation: { type: Date, default: Date.now, immutable: true },
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