/*
* @Author: askMeWhy
* @Date:   2017-11-28 15:41:06
* @Last Modified by:   bigWave
* @Last Modified time: 2017-12-15 18:39:13
*/
const Model = require('../model/bill');
const qs = require('qs');
const { UserList } = Model;
const userController = {
	all(req,res){
		UserList.find({}).exec((err,user) => res.json(user));
	},
	create(req,res){
		const requestBody = req.body;
		let rb = qs.parse(requestBody);
		let newUser = [];
		for(let key in rb){
			newUser.push(rb[key]);
		}
		UserList.create(newUser, (err,saved)=>{
			res.json(saved)
		})
	},
	update(req,res){
		const idParam = req.params.id;
		let userBody = req.body;
		UserList.findOne({_id:idParam},(err,data)=>{
			Object.keys(userBody).forEach((key) => {
				if(data[key] != void 0){
					data[key] = userBody[key];
				}
			});
			data.save((err,updated)=> res.json(updated));
		})
	},
	remove(req,res){
		const idParam = req.params.id;
		UserList.find({}).remove({},(err,removed) => res.json({ok:true}));
	}
}

module.exports = userController;