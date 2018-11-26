/*
* @Author: askMeWhy
* @Date:   2018-10-18 10:40:10
* @Last Modified by:   bigwave
* @Last Modified time: 2018-11-21 16:04:29
*/
const express = require('express');
const router = express.Router();
const {
	projectController
} = require('../../controller');

router.get('/projectList', projectController.all);

module.exports = router;