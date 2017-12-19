/*
* @Author: askMeWhy
* @Date:   2017-11-28 15:04:26
* @Last Modified by:   bigWave
* @Last Modified time: 2017-12-19 15:21:26
*/
const Model = require('../model/bill');
const qs = require('qs');
const { Bill,List } = Model;
const billController = {
	all(req,res){
		Bill.find({}).exec((err,bills) => res.json(bills));
	},
	byId(req,res){
		const idParam = req.params.id;
		Bill
		.findOne({_id:idParam})
		.exec((err,bill) => res.json(bill));
	},
	create(req,res){
		const requestBody = req.body;
		let rb = qs.parse(requestBody);
		const newBill = new Bill(requestBody);
		newBill.save((err,saved)=>{
			Bill
			.findOne({_id:saved._id})
			.exec((err,bill)=> res.json(bill));
		});
	},
	update(req,res){
		const idParam = req.params.id;
		let billBody = req.body;
		Bill.findOne({_id:idParam},(err,data)=>{
			Object.keys(billBody).forEach((key) => {
				if(data[key] != void 0){
					data[key] = billBody[key];
				}
			});
			data.save((err,updated)=> res.json(updated));
		})
	},
	remove(req,res){
		const idParam = req.params.id;
		Bill.findOne({_id: idParam}).remove((err,removed) => res.json(idParam));
	}
}

module.exports = billController;