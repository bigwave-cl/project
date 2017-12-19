/*
* @Author: askMeWhy
* @Date:   2017-10-16 18:30:37
* @Last Modified by:   bigWave
* @Last Modified time: 2017-10-17 10:40:25
*/
const Model = require('../model/product');
const { Cart } = Model;

const cartController = {
	all(req,res){
		Cart.find({}).populate('product').exec((err,cars) => res.json(cars));
	},
	create(req,res){
		const requestBody = req.body;
		const newCart = new Cart(requestBody);
		newCart.save((err,saved)=>{
			Cart
			.findOne({_id:saved._id})
			.populate('product')
			.exec((err,cart)=> res.json(cart));
		});
	},
	remove(req,res){
		const idParam = req.params.id;
		Cart.findOne({_id: idParam}).remove((err,removed) => res.json(removed));
	}/*,
	byId(req,res){
		const idParam = req.params.id;
		Product
		.findOne({_id:idParam})
		.populate('manufacturer')
		.exec((err,product) => res.json(product));
	},
	create(req,res){
		const requestBody = req.body;
		const newProduct = new Product(requestBody);
		newProduct.save((err,saved)=>{
			Product
			.findOne({_id:saved._id})
			.populate('manufacturer')
			.exec((err,product)=> res.json(product));
		});
	},
	update(req,res){
		const idParam = req.params.id;
		let product = req.body;
		Product.findOne({_id:idParam},(err,data)=>{
			Object.keys(product).forEach((key) => {
				if(data[key] != void 0){
					data[key] = product[key];
				}
			});

            data.manufacturer = product.manufacturer;
			data.save((err,updated)=> res.json(updated));
		})
	},
	remove(req,res){
		const idParam = req.params.id;
		Product.findOne({_id: idParam}).remove((err,removed) => res.json(idParam));
	}*/
}

module.exports = cartController;