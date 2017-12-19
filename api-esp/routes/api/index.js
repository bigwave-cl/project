/*
* @Author: askMeWhy
* @Date:   2017-09-20 10:50:09
* @Last Modified by:   bigWave
* @Last Modified time: 2017-11-07 15:17:18
*/
const express = require('express');
const router = express.Router();
const productController = require('../../controller/product');
const manufacturerController = require('../../controller/manufacturer');
const cartController = require('../../controller/cart');

router.get('/manufacturer', manufacturerController.all);
router.post('/manufacturer', manufacturerController.create);
router.put('/manufacturer/:id', manufacturerController.update);
router.delete('/manufacturer/:id', manufacturerController.remove);
router.get('/products', productController.all);
router.get('/products/:id', productController.byId);
router.post('/products', productController.create);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.remove);
router.get('/cart', cartController.all);
router.delete('/cart/:id', cartController.remove);
router.post('/cart', cartController.create);

module.exports = router;