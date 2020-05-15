const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: true
    },
    discussion_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discussion',
        required: true,
        immutable: true
    },
    content: { type: String, required: true },
    creation_date: { type: Date, default: Date.now, required: true },
}, {
    collection: 'messages',
    minimize: false,
    versionKey: false,
}).set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
    }
})

module.exports = Schema