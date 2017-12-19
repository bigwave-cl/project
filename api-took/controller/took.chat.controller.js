/*
 * @Author: askMeWhy
 * @Date:   2017-10-26 12:05:50
 * @Last Modified by:   smile
 * @Last Modified time: 2017-11-14 11:56:06
 */
const tookChat = require('../model/chat.js');
const { Message, Goods } = tookChat;
let msgId = 2861;
const tookChatController = {
	getMessage(req, res) {
		Message.servertime = parseInt(Date.now() / 1000, 10);
		res.json(Message);
	},
	getGoods(req, res) {
		const requestBody = req.body;

		Goods.servertime = parseInt(Date.now() / 1000, 10);

		if (!requestBody.offset) {
			Goods.hasmore = true;
			Goods.offset = 1;
			res.json(Goods);
		} else {
			if (Goods.hasmore) {
				Goods.offset++;
			}

			if (Goods.offset == 3) {
				Goods.hasmore = false;
			}
			res.json(Goods);
		}

	},
	sendMessage(req, res) {
		let messageModal = {
			"ok": true,
			"servertime": 1509437768,
			"msgid": 2861,
			"user_id": 15867261,
			"own":true,
			"name": "admin",
			"thumb_pic": "https://mob.xiuzhimeng.com/bfmapi/files/2017/04/06/thumb58e5b61d2da6b.jpg?size=150x150",
			"role": 0,
			"msg": {
				"type": "1",
				"content": "多一点真诚"
			},
			"hasmore": false
		}
		const requestBody = req.body;
		messageModal.servertime = parseInt(Date.now() / 1000, 10);
		messageModal.role = 1;
		messageModal.msgid = ++msgId;
		if (/^\{.*\}$/.test(requestBody.msg)) requestBody.msg = JSON.parse(requestBody.msg);
		messageModal.msg = requestBody.msg;
		Message.list.push(messageModal);
		res.json(messageModal);

	}
};
module.exports = tookChatController;
