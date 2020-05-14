const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
	type: {type: String, required: true},
	author_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	link_id: {type: String, required: true},
	content: String,
	creation_date: { type: Date, default: Date.now },
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