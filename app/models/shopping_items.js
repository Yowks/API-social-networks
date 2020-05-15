const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
	shop_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Shop',
		required: true
	},
	name: { type: String, required: true, trim: true },
	creation_date: { type: Date, default: Date.now, required: true },
	hour: { type: Date},
	quantity: { type: Number}
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