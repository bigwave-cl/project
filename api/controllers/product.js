/*
* @Author: askMeWhy
* @Date:   2017-09-19 16:25:12
* @Last Modified by:   bigWave
* @Last Modified time: 2017-09-19 17:36:54
*/
const Model = require('../model');
const {Product} = Model;

const productController = {
	all(req,res){
		Product.find({}).exec((err,products) => res.json(products));
	},
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
			.findOne({_id:saved.id})
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
			data.save((err,updated)=> res.json(updated));
		})
	},
	remove(req,res){
		const idParam = req.params.id;
		Product.findOne({_id: idParam}).remove((err,removed) => res.json(idParam));
	}
}

module.exports = productController;