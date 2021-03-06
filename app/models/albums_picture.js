const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
	album_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Album',
		required: true
	},
	path: {type: String, required: true},
	title: {type: String, required: true},
	creation_date: { type: Date, default: Date.now },
}, {
	collection: 'albums_pictures',
	minimize: false,
	versionKey: false,
}).set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id
		delete ret._id
	}
})

module.exports = Schema