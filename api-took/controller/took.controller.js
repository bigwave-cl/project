/*
* @Author: askMeWhy
* @Date:   2017-10-20 16:27:28
* @Last Modified by:   smile
* @Last Modified time: 2017-11-09 11:05:45
*/
const tookLotteryModel = require('../model/lottery.home.js');
const { Lottery,GetCode,Marquee,GetDetail } = tookLotteryModel;
const tookChatController = require('./took.chat.controller.js');

const tookController = (req,res)=>{
	const requestBody = req.body;
	if(requestBody.method && requestBody.method == 'lottery_home'){
		tookHandle.home(req,res);
	}
	if(requestBody.method && requestBody.method == 'lottery_getLuckyNum'){
		tookHandle.luckyNum(req,res);
	}
	if(requestBody.method && requestBody.method == 'lottery_getCode'){
		tookHandle.getCode(req,res);
	}
	if(requestBody.method && requestBody.method == 'lottery_prizeDetail'){
		tookHandle.getDetail(req,res);
	}
	if(requestBody.method && requestBody.method == 'lottery_marquee'){
		tookHandle.getMarquee(req,res);
	}
	if(requestBody.method && requestBody.method == 'lottery_goodsList'){
		tookChatController.getGoods(req,res);
	}
	if(requestBody.method && requestBody.method == 'chat_msgList'){
		tookChatController.getMessage(req,res);
	}
	if(requestBody.method && requestBody.method == 'chat_sendMsg'){
		tookChatController.sendMessage(req,res);
	}
}
const tookHandle = {
	curLev: 1,
	home(req,res){
		const nowTime = parseInt(Date.now()/1000,10);
		Lottery.servertime = nowTime;

		Lottery.ok = true;
		
		if(!Lottery.ok){
			Lottery.lot = {};
			res.json(Lottery);
			return;
		}
		/* 开始领号 */
		if(Lottery.lot.get_code_begin - nowTime <= 0)  Lottery.lot.state = 1;
		/* 领号结束 */
		if(Lottery.lot.get_code_end - nowTime <= 0)  Lottery.lot.state = 2;
		/* 开始抽奖 */
		if(Lottery.lot.open_time - nowTime <= 0)  Lottery.lot.state = 3;
		if(Lottery.lot.state === 3){
			Lottery.lot.cur_prize_lev = parseInt(Lottery.lot.cur_prize_lev,10);

			this.handleLev(Lottery.lot.prizes,Lottery.lot.cur_prize_lev,nowTime);
			Lottery.lot.cur_prize_lev = this.curLev;

			let curPrize = Lottery.lot.prizes.filter(index=>{
				return index.lev == Lottery.lot.cur_prize_lev;
			})[0];

			if(Lottery.lot.cur_prize_lev == 1 && nowTime - curPrize.next_open_time >= 0 ){
				Lottery.lot.lucky_open = Lottery.lot.lucky_open.map(index=> {
					index = 1;
					return index;
				});
				if(nowTime - curPrize.next_open_time >= 300) Lottery.lot.state = 4;
			}

		}
		console.log(Lottery.lot.state);
		res.json(Lottery);
	},
	handleLev(prizes,lev,nowTime){
		if(lev == 1) {
			this.curLev = lev;
			return;
		}
		let curPrize = prizes.filter(index=>{
			return index.lev == lev;
		})[0];
		if(curPrize.next_open_time - nowTime <= 0 ){
			lev = Math.max(1,--lev);
			this.handleLev(prizes,lev,nowTime);
		}else{
			this.curLev = lev;
		}

	},
	luckyNum(req,res){
		const requestBody = req.body;
		if(!requestBody.lot_id || requestBody.lot_id != Lottery.lot.lot_id) {
			res.json({
				"error":"lot_id错误"
			})
		}
		let codes = Lottery.lot.prizes.filter(index=> index.lev == 1)[0].codes;
		let num = Math.floor(Math.random()*4);
		Lottery.lot.lucky_open[num] = 1;
		res.json(
			{
				"ok": true,
				"num": codes.substr(num,1),
				"servertime": parseInt(Date.now()/1000,10)
			}
		)
	},
	getCode(req,res){
		const requestBody = req.body;
		if(!requestBody.lot_id || requestBody.lot_id != Lottery.lot.lot_id) {
			res.json({
				"error":"lot_id错误"
			})
		}
		Lottery.lot.has_get_code = true;
		GetCode.servertime = parseInt(Date.now()/1000,10);
		res.json(GetCode);
	},
	getMarquee(req,res){
		const requestBody = req.body;
		if(!requestBody.lot_id || requestBody.lot_id != Lottery.lot.lot_id) {
			res.json({
				"error":"lot_id错误"
			})
		}
		Marquee.servertime = parseInt(Date.now()/1000,10);
		res.json(Marquee);
	},
	getDetail(req,res){
		const requestBody = req.body;
		if(!requestBody.lot_id || requestBody.lot_id != Lottery.lot.lot_id) {
			res.json({
				"error":"lot_id错误"
			})
		}
		GetDetail.state = Lottery.lot.state;
		GetDetail.state = Lottery.lot.state;
		GetDetail.has_get_code = Lottery.lot.has_get_code;
		GetDetail.servertime = parseInt(Date.now()/1000,10);
		res.json(GetDetail);
	}
}
module.exports = tookController;