/*
 * @Author: askMeWhy
 * @Date:   2017-09-20 11:16:10
 * @Last Modified by:   bigWave
 * @Last Modified time: 2017-10-17 10:40:16
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema,
	model = mongoose.model.bind(mongoose),
	ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = Schema({
	id: ObjectId,
	name: String,
	image: String,
	price: Number,
	description: String,
	manufacturer: { type: ObjectId, ref: 'Manufacturer' }
});

const manufacturerSchema = Schema({
	id: ObjectId,
	name: String
})
const cartSchema = Schema({
	id: ObjectId,
	product: { type: ObjectId, ref: 'Product' }
})

const Product = model('Product', productSchema);
const Manufacturer = model('Manufacturer', manufacturerSchema);
const Cart = model('Cart', cartSchema);

module.exports = { Product, Manufacturer,Cart };
