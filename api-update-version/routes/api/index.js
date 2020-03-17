/*
* @Author: askMeWhy
* @Date:   2018-10-18 10:40:10
* @Last Modified by:   bigwave
* @Last Modified time: 2018-10-18 11:02:50
*/
const express = require('express');
const router = express.Router();
const {
	versionController
} = require('../../controller');

router.get('/update', versionController.update);

module.exports = router;