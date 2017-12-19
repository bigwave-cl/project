/*
* @Author: askMeWhy
* @Date:   2017-10-20 16:25:56
* @Last Modified by:   bigWave
* @Last Modified time: 2017-10-20 16:47:26
*/
const express = require('express');
const router = express.Router();
const tookController = require('../../controller/took.controller');

router.post('/', tookController);

module.exports = router;