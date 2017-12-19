/*
 * @Author: askMeWhy
 * @Date:   2017-09-20 10:50:09
 * @Last Modified by:   bigWave
 * @Last Modified time: 2017-12-19 11:42:04
 */
const express = require('express');
const router = express.Router();
const billController = require('../../controller/bill');
const userController = require('../../controller/user');
const getJsApiData = require('../../controller/auth');
const getWechatSign = require('../../controller/getWechatSign');

router.get('/bill', billController.all);
router.get('/bill/:id', billController.byId);
router.post('/bill', billController.create);
router.put('/bill/:id', billController.update);
router.delete('/bill/:id', billController.remove);

router.get('/user', userController.all);
router.post('/user', userController.create);
router.put('/user/:id', userController.update);
router.delete('/user', userController.remove);

router.post('/getWechat', getWechatSign);


module.exports = router;
