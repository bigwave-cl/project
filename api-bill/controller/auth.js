/*
 * @Author: askMeWhy
 * @Date:   2017-12-06 11:17:58
 * @Last Modified by:   bigWave
 * @Last Modified time: 2017-12-06 11:47:34
 */
const fs = require('fs');
const request = require('request');
const qs = require('querystring');
const config = require('./config');
const getWebAuth = require('./getWebAuth');


function getJsApiTicket() {
	getWebAuth().then(r => {
		console.log('r=>',r);
		let token = '22';
		const reqUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + token + '&type=jsapi';
		let options = {
			method: 'get',
			url: reqUrl
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
	})

}
//sha1
function sha1(str) {
	let shasum = crypto.createHash("sha1")
	shasum.update(str)
	str = shasum.digest("hex")
	return str
}
//noncestr
function getNonceStr() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < 16; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}
//timestamp
function getTimestamp() {
	return new Date().valueOf();
}

function getSign(jsApiTicket, noncestr, timestamp, url) {
	let data = {
		'jsapi_ticket': jsApiTicket,
		'noncestr': noncestr,
		'timestamp': timestamp,
		'url': 'http://wuyrsp3tma.proxy.qqbrowser.cc/auth'
	};
	var sortData = "jsapi_ticket=" + jsApiTicket + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url=" + url;
	console.log(sortData);
	return sha1(sortData);
}

//返回数据分别为sign, timestamp, noncestr
function getJsApiData(clientUrl) {
	let noncestr = getNonceStr();
	let timestamp = getTimestamp();
	return getJsApiTicket().then(data => {
		return [getSign(JSON.parse(data).ticket, noncestr, timestamp, clientUrl), timestamp, noncestr];
	})
}

module.exports = getJsApiData;
