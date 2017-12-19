/*
* @Author: askMeWhy
* @Date:   2017-09-20 11:20:47
* @Last Modified by:   bigWave
* @Last Modified time: 2017-11-07 15:16:38
*/
const Model = require('../model/product');
const {Manufacturer} = Model;

const manufacturerController = {
	all(req,res){
		Manufacturer.find({}).exec((err,manufacturers) => res.json(manufacturers));
	},
	create(req,res){
		const requestBody = req.body;
		const newManufacturer = new Manufacturer(requestBody);
		newManufacturer.save((err,saved)=>{
			res.json({
				'data':saved,
				'code': 200,
				'message': '添加成功'
			})
		});
	},
	update(req,res){
		const idParam = req.params.id;
		let manufacturer = req.body;
		Manufacturer.findOne({_id:idParam},(err,data)=>{
			Object.keys(manufacturer).forEach((key) => {
				if(data[key] != void 0){
					data[key] = manufacturer[key];
				}
			});
			data.save((err,updated)=> res.json(updated));
		})
	},
	remove(req,res){
		const idParam = req.params.id;
		Manufacturer.findOne({_id: idParam}).remove((err,removed) => res.json(idParam));
	}
}
module.exports = manufacturerController;