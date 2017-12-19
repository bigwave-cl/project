/*
 * @Author: askMeWhy
 * @Date:   2017-12-06 14:21:18
 * @Last Modified by:   bigWave
 * @Last Modified time: 2017-12-19 11:41:47
 */
/*var wechatConfig = {
	"appId": "wx6cc131178b43de7f",
	"appSecret": "4602439571b4150b413aa02aa2f941cc"
};*/
var wechatConfig = {
	"appId": "wx14ccb52451e7dfcd",
	"appSecret": "0f0e59256635bf2496d41157049012b2"
};
const request = require('request');
const qs = require('querystring');
const crypto = require('crypto');
const jsSHA = require('jssha')

const getWechatSign = function(req, res) {
	if (global.auth && !checkTime()) {
		console.log('未过期')
		getjSApiTicket(global.auth).then(apiResult => {
			getSign(JSON.parse(apiResult)['ticket'],req,res);
		}, error => {
			res.json({ error: 'jsticket_error' });
		});
	} else {
		console.log('过期')
		getAuthToken().then(r => {
			console.log(r)
			global.auth = JSON.parse(r)['access_token'];
			global.authTime = Date.now();
			getjSApiTicket(JSON.parse(r)['access_token']).then(apiResult => {
				getSign(JSON.parse(apiResult)['ticket'],req,res);
			}, error => {
				res.json({ error: 'jsticket_error' });
			});
		}, error => {
			res.json({ error: 'auth_error' });
		})
	}
}
var getAuthToken = function() {
	let reqUrl = 'https://api.weixin.qq.com/cgi-bin/token?';
	let params = {
		appid: wechatConfig.appId,
		secret: wechatConfig.appSecret,
		grant_type: 'client_credential'
	};

	let options = {
		method: 'get',
		url: reqUrl + qs.stringify(params)
	};
	return new Promise((resolve, reject) => {
		request(options, function(err, res, body) {
			if (res) {
				resolve(body);
			} else {
				reject(err);
			}
		})
	})
}

var getjSApiTicket = function(accessToken) {
	let reqUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?';
	let params = {
		access_token: accessToken,
		type: 'jsapi'
	}
	let options = {
		method: 'get',
		url: reqUrl + qs.stringify(params)
	};
	return new Promise((resolve, reject) => {
		request(options, function(err, res, body) {
			if (res) {
				resolve(body);
			} else {
				reject(err);
			}
		})
	})
};

var checkTime = function() {
	let _overdue = true; //是否过期，默认过期
	let _now = Date.now();
	if (global.authTime) {
		let _difference = (_now - global.authTime) / (1000 * 60 * 60);
		if (_difference > 1.5) {
			_overdue = true;
		} else {
			_overdue = false;
		}
	}
	return _overdue;
}

var getSign = function(ticket,req,res) {

	const createNonceStr = () => {
		let text = "";
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (let i = 0; i < 16; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}
	const createTimeStamp = () => parseInt(new Date().getTime() / 1000) + '';
	const sha1 = (str)=>{
		let shaObj = new jsSHA('SHA-1', 'TEXT');
		shaObj.update(str);
		let _signature = '';
		_signature = shaObj.getHash('HEX');
		console.log(_signature);
		return _signature;
	};
	const calcSignature = function(ticket, noncestr, ts, url) {
		var str = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp=' + ts + '&url=' + url; // (第一步设置的域名+接口)
		shaObj = sha1(str);
		return shaObj;
	}

	const noncestr = createNonceStr();
	const timestamp = createTimeStamp();
	console.log(ticket)
	const signature = calcSignature(ticket, noncestr, timestamp, 'http://www.askmewhy.cn/'); // 通过sha1算法得到

	// res.send({
	// 	appid: wechatConfig.appId,
	// 	noncestr: noncestr,
	// 	timestamp: timestamp,
	// 	signature: signature,
	// })
	res.send({
		appId: wechatConfig.appId,
		nonceStr: noncestr,
		timestamp: timestamp,
		signature: signature,
	})
}

module.exports = getWechatSign;
