/*
 * @Author: askMeWhy
 * @Date:   2018-01-30 11:44:28
 * @Last Modified by:   bigWave
 * @Last Modified time: 2018-02-12 14:54:54
 */
const merge = (...arg) => {
	if (arg.length == 0) {
		throw Error(`merge error=>请传入需要合并的对象`);
	}
	let target = arg[0] || {},
		depath = false,
		length = arg.length,
		i = 1;

	if (Object.prototype.toString.call(target) == '[object Boolean]') {
		depath = target;
		target = arg[i];
		i++
	}

	if (typeof target !== "object") {
		target = {};
	}

	if (i == 2 && length <= 1) {
		throw Error(`merge error=>请传入需要合并的对象`);
	}

	for (; i < length; i++) {
		let source = arg[i] || {};
		if (source != null) {
			for (let key in source) {
				let src = target[key],
					copy = source[key];
				if (target === copy) {
					continue;
				}
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					if (depath && copy && (isObject(copy) || Array.isArray(copy))) {
						let clone;
						if (Array.isArray(copy)) {
							clone = src && Array.isArray(src) ? src : [];
						} else {
							clone = src && isObject(src) ? src : {};
						}
						target[key] = merge(depath, clone, copy);
					} else if (copy !== void 0) {
						target[key] = copy;
					}
				}
			}
		}
	}
	return target;
}

const isObject = (target) => {
	return Object.prototype.toString.call(target) === '[object Object]';
}

const { LoginModel } = require('../model/login.js');
const { CategoryModel, GoodModel, OrderModel } = require('../model/category.js');
const { StaffModel,StoreModel,ReporMerchantModel,ReporStoreModel,Top10Model } = require('../model/manage.js');

const apiController = (req, res) => {
	const requestBody = req.body;
	if (requestBody.method && requestBody.method == 'pos_login') {
		apiHandle.login(req, res);
	}
	if (requestBody.method && requestBody.method == 'pos_goodsType') {
		apiHandle.category(req, res);
	}
	if (requestBody.method && requestBody.method == 'pos_goods') {
		apiHandle.goods(req, res);
	}
	if (requestBody.method && requestBody.method == 'pos_createOrder') {
		apiHandle.orderCreate(req, res);
	}
	if (requestBody.method && requestBody.method == 'pos_newSelectOrder') {
		apiHandle.orderInfo(req, res);
	}
	if (requestBody.method && requestBody.method == 'pos_cancelOrder') {
		apiHandle.removeOrder(req, res);
	}
	if (requestBody.method && requestBody.method == 'pos_memberInfo') {
		apiHandle.memberInfo(req, res);
	}
	if (requestBody.method && requestBody.method == 'user_getCode') {
		apiHandle.getCode(req, res);
	}
	if (requestBody.method && requestBody.method == 'pos_employeeList') {
		apiHandle.getStaff(req, res);
	}
	if (requestBody.method && requestBody.method == 'pos_storeList') {
		apiHandle.getStore(req, res);
	}
	if (requestBody.method && requestBody.method == 'pos_report') {
		apiHandle.getReport(req, res);
	}
	if (requestBody.method && requestBody.method == 'pos_topTen') {
		apiHandle.getTop(req, res);
	}
	if (requestBody.method && requestBody.method == 'test') {
		apiHandle.test(req, res);
	}
}

const apiHandle = {
	test(req, res) {
		res.json({
			ok: true,
			type: 'test'
		})
	},
	getCode(req, res){
		res.json({
			ok: true,
			type: 'sss'
		})
	},
	login(req, res) {
		res.json(LoginModel);
	},
	category(req, res) {
		res.json(CategoryModel);
	},
	goods(req, res) {
		const requestBody = req.body;

		let offset = parseInt(requestBody.offset, 10);

		let _mList = [...GoodModel.list];

		let _list = [];
		_mList.map((index, key) => {
			if (key >= offset * 10 && key <= ((offset + 1) * 10 - 1)) {
				_list.push(index);
			}
		})
		let hasmore = false;
		if (_mList.length > (offset + 1) * 10) hasmore = true;
		let _render = merge(true, {}, GoodModel);
		_render.hasmore = hasmore;
		_render.list = _list;
		_render.offset = ++offset;

		res.json(_render);
	},
	orderCreate(req, res) {
		res.json({
			"ok": true,
			"servertime": 1517387910,
			"posid": "83267613",
			"source": 2,
			"info": {
				"orderno": 35613, //调支付必须 
				"title": "商城购物",
				"sjamount": "9.29", //调支付必须 
				"total": 9.29,
				"usedjq": "0.00",
				"useyb": 0,
				"usegold": 0,
				"uid": 0,
				"notifyurl": "https : //subtest.xiuzhimeng.com/payapi/ordernotice.html"
			},
			"hasmore": false
		})
	},
	orderInfo(req, res) {
		const requestBody = req.body;

		let offset = parseInt(requestBody.offset, 10);

		let _mList = [...OrderModel.list];

		let _list = [];
		_mList.map((index, key) => {
			if (key >= offset * 10 && key <= ((offset + 1) * 10 - 1)) {
				_list.push(index);
			}
		})
		let hasmore = false;
		if (_mList.length > (offset + 1) * 10) hasmore = true;
		let _render = merge(true, {}, OrderModel);
		_render.hasmore = hasmore;
		_render.list = _list;
		_render.offset = ++offset;

		res.json(_render);
	},
	removeOrder(req,res){
		const requestBody = req.body;
		let orderId = requestBody.order_id;
		let index = OrderModel.list.findIndex(o=>o.order_id == orderId);
		index != -1 && OrderModel.list.splice(index,1);
		res.json({
			ok: index != -1
		})
	},
	memberInfo(req, res) {
		const requestBody = req.body;
		let _ok = true;
		if(requestBody.code && requestBody.code == "111111"){
			_ok = false;
		}
		res.json({
			"ok": _ok,
			"servertime": 1517395295,
			"id": "15967973",
			"name": "KobeBryant",
			"phone": "17760524862",
			"hasmore": false
		});
	},
	getStaff(req,res){
		const requestBody = req.body;

		let offset = parseInt(requestBody.offset, 10);

		let _mList = [...StaffModel.list];

		let _list = [];
		_mList.map((index, key) => {
			if (key >= offset * 10 && key <= ((offset + 1) * 10 - 1)) {
				_list.push(index);
			}
		})
		let hasmore = false;
		if (_mList.length > (offset + 1) * 10) hasmore = true;
		let _render = merge(true, {}, StaffModel);
		_render.hasmore = hasmore;
		_render.list = _list;
		_render.offset = ++offset;

		res.json(_render);
	},
	getStore(req,res){
		const requestBody = req.body;

		let offset = parseInt(requestBody.offset, 10);

		let _mList = [...StoreModel.list];

		let _list = [];
		_mList.map((index, key) => {
			if (key >= offset * 10 && key <= ((offset + 1) * 10 - 1)) {
				_list.push(index);
			}
		})
		let hasmore = false;
		if (_mList.length > (offset + 1) * 10) hasmore = true;
		let _render = merge(true, {}, StoreModel);
		_render.hasmore = hasmore;
		_render.list = _list;
		_render.offset = ++offset;

		res.json(_render);
	},
	getReport(req,res){
		const requestBody = req.body;
		let _render = {};
		if(requestBody.type == 1){
			_render = merge(true,{},ReporMerchantModel);
		}else{
			_render = merge(true,{},ReporStoreModel);
		}
		res.json(_render);
	},
	getTop(req,res){
		const requestBody = req.body;
		let _render = merge(true,{},Top10Model);
		res.json(_render);
	}
}

module.exports = apiController;
