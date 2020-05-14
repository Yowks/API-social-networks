const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
	event_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event',
		required: true
	},
	item_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ShoppingItem',
		required: true,
		unique: true
	},
	hour: { type: Date, required: true },
	quantity: { type: Number, required: true, min: 0 },
}, {
	collection: 'shoppers',
	minimize: false,
	versionKey: false,
}).set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id
		delete ret._id
	}
})

module.exports = Schema