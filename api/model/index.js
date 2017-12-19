/*
* @Author: askMeWhy
* @Date:   2017-09-19 16:05:04
* @Last Modified by:   smile
* @Last Modified time: 2017-09-19 16:11:53
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema,
	  model = mongoose.model.bind(mongoose),
	  ObjectId = mongoose.Schema.Types.ObjectId;
const productSchema = Schema({
	id:ObjectId,
	name:String,
	image:String,
	price:Number,
	description:String,
	manufacturer:{type:ObjectId,ref:'Manufacturer'}
});
const manufacturerSchema = Schema({
	id:ObjectId,
	name:String
})

const Product = model('Product',productSchema);
const Manufacturer = model('Manufacturer',manufacturerSchema);

module.exports = {Product,Manufacturer};