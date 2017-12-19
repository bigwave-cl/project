/*
* @Author: askMeWhy
* @Date:   2017-12-06 11:28:43
* @Last Modified by:   bigWave
* @Last Modified time: 2017-12-06 11:38:11
*/

const request = require('request');
const qs = require('querystring');
const config = require('./config');

function getWebToken(code) {
	let reqUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?';
	let params = {
		appid: config.appId,
		secret: config.appSecret,
		code: code,
		grant_type: 'authorization_code'
	};

	let options = {
		method: 'get',
		url: reqUrl + qs.stringify(params)
	};
	console.log(options.url);
	return new Promise((resolve, reject) => {
		request(options, function(err, res, body) {
			if (res) {
				console.log(body)
				resolve(body);
			} else {
				reject(err);
			}
		})
	})
}

module.exports = getWebToken;