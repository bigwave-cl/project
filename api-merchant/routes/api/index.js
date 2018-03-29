/*
* @Author: askMeWhy
* @Date:   2018-01-30 11:43:24
* @Last Modified by:   bigWave
* @Last Modified time: 2018-01-30 11:44:14
*/
const express = require('express');
const router = express.Router();
const apiController = require('../../controller/api.controller');

router.post('/', apiController);

module.exports = router;