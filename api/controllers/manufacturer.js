/*
* @Author: askMeWhy
* @Date:   2017-09-19 16:24:49
* @Last Modified by:   smile
* @Last Modified time: 2017-09-19 16:28:24
*/
const Model = require('../model');
const {Manufacturer} = Model;

const manufacturerController = {
	all(req,res){
		Manufacturer.find({}).exec((err,manufacturers) => res.json(manufacturers));
	}
}
module.exports = manufacturerController;