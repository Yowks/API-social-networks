const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
	event_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event',
		required: true
	},
	name: { type: String, required: true, trim: true },
	creation_date: { type: Date, default: Date.now, required: true },
}, {
	collection: 'shopping_items',
	minimize: false,
	versionKey: false,
}).set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id
		delete ret._id
	}
})

module.exports = Schema