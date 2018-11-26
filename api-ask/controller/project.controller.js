/*
* @Author: askMeWhy
* @Date:   2018-10-18 10:41:26
* @Last Modified by:   bigwave
* @Last Modified time: 2018-11-21 16:02:53
*/

const { ProjectModel } = require('../model/project.js');

const projectController = {
	all(req,res){
		res.json({
			data: ProjectModel,
			code: 200
		});
	}
};

module.exports = {projectController};