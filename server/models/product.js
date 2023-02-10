const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
	{
		id: { type: String },
		name: { type: String },
		category: { type: String, lowercase: true },
		filter: { type: Number },
		price: { type: Number },
	},
	{ collection: 'products' }
);

module.exports = mongoose.model('Product', productSchema);
