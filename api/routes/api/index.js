/*
* @Author: askMeWhy
* @Date:   2017-09-19 16:14:23
* @Last Modified by:   smile
* @Last Modified time: 2017-09-19 17:24:51
*/
const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product');
const manufacturerController = require('../../controllers/manufacturer');

router.get('/manufacturer', manufacturerController.all);
router.get('/products', productController.all);
router.get('/products/:id', productController.byId);
router.post('/products', productController.create);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.remove);

module.exports = router;