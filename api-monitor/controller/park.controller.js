/*
* @Author: askMeWhy
* @Date:   2018-10-18 10:41:26
* @Last Modified by:   bigwave
* @Last Modified time: 2018-10-25 16:56:14
*/
const { ParkModel,ParkGateModel } = require('../model/park.js');
let p = ParkModel;
setTimeout(()=>{
	p = ParkModel.slice(0,4);
}, 20*1000);
const parkController = {
	all(req,res){

		res.json({
			data: p,
			code: 200
		});
	},
	gate(req,res){
		const requestParams = req.params;
		let _index = ParkGateModel.findIndex(cur=> cur.park_id == requestParams.id);
		let resData = {};
		if(_index == -1){
			resData = {
				code: 500,
				msg: '未找到相关数据'
			}
		}else{
			resData = {
				code: 200,
				data: ParkGateModel[_index]
			}
		}
		res.json(resData);
	}
};

module.exports = {parkController};