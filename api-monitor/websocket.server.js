/*
* @Author: askMeWhy
* @Date:   2018-10-17 11:04:02
* @Last Modified by:   bigwave
* @Last Modified time: 2018-10-24 16:36:21
*/
var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server,
	wss = new WebSocketServer({ port: 8183 }),
	uuid = require('node-uuid');
const { ParkModel,ParkGateModel } = require('./model/park.js');

var clients = [],
	clientIndex = 0,
	postTimer = null;

function random(min, max) {
	return ((Math.random() * (max - min)) + min).toFixed(2)
}
wss.on('connection', function(ws) {
	var client_uuid = uuid.v4();
	clientIndex ++ ;
	var nickname = "monitor--" + clientIndex;
    clients.push({ "id": client_uuid, "ws": ws, "nickname": nickname });
    console.log(nickname)
	wsSend('system', client_uuid , nickname, {
		msg: '欢迎"\''+ nickname + '\'上线'
	},getDate(),1);

	ws.on('message', function(message) {
		let data = JSON.parse(message);
		postTimer&&clearTimeout(postTimer)
		postMessage(data.park_id,client_uuid,nickname);
	});
	ws.on('close', function () {
	    closeSocket(client_uuid , nickname);
	});
    ws.on("error", function (code, reason) {
    	closeSocket(client_uuid , nickname);
        console.log(nickname+"异常关闭")
    });
    process.on('SIGINT', function () {
        closeSocket(client_uuid , nickname , {
        	msg: '服务器断开连接'
        });
        process.exit();
    });
});

function wsSend(type, client_uuid, nickname, data ,time, online){
	for (var i = 0 , l = clients.length; i < l; i++) {
		var clientSocket = clients[i].ws;
		if(clientSocket.readyState === WebSocket.OPEN){
			// clients[i].id == client_uuid
			clientSocket.send(JSON.stringify({
				type: type,
				id : client_uuid,
				data: data,
				time : time,
				nickname: nickname
			}));
		}
	}
}

function getDate(){
	var now = new Date();
	return now.getFullYear() + '-' + 
		   handleDate( now.getMonth() + 1 , 10) + '-' +
		   handleDate( now.getDate() + 1 , 10) + '  ' +
		   handleDate( now.getHours() , 10) + ':' +
		   handleDate( now.getMinutes() , 10) + ':' +
		   handleDate( now.getSeconds() , 10);
}
function handleDate(val,max){
	return val < max ?  '0'+ val : val;
}

function closeSocket(client_uuid, nickname, message ){
	for (var i = 0; i < clients.length; i++) {
	    if (clients[i].id == client_uuid) {
	        var disconnect_message;
	        if (message) {
	            disconnect_message = message;
	        } else {
	            disconnect_message = {
	            	msg: "\'"+ nickname + "\' 已下线"
	            }
	        }
	        wsSend("system", client_uuid, nickname, disconnect_message);
	        clients.splice(i, 1);
	    }
	}
}

function postMessage(id = '',client_uuid,nickname){
	let _time = random(1,5) * 2000;
    postTimer = setTimeout(() => {
    	clearTimeout(postTimer);
        postMessage(id, client_uuid, nickname);
    }, _time);
	if(id == ''){
		ParkModel.map((cur,index)=>{
			// cur.link_status = random(1,100) > 50 ? 1:2;
			if(index < 4){
				cur.link_status = 1;
			}
			if(index >= 4 && index < 8){
				cur.link_status = 2;
			}
			if(index >= 8 && index < 12){
				cur.link_status = 3;
			}
			if(index >= 12 && index < 16){
				cur.link_status = 4;
			}
			return cur;
		})
		let _open = ParkModel.filter(cur=> cur.link_status != 1);
        wsSend("data", client_uuid, nickname, {
    		cloud_status: random(1,100) > 50 ? 1:2,
    		park_list: _open
        });
	}else{
		let _index = ParkGateModel.findIndex(cur=> cur.park_id == id);
		if(_index != -1){
			let _cur = ParkGateModel[_index];
			_cur.gate_list = _cur.gate_list.map(gate=>{
				gate.link_status = 1;
				let linkStatus = 1;
				gate.children = gate.children.map(s=>{
					s.status = Math.ceil(random(0,4));
					if(linkStatus == 1){
						linkStatus = s.status;
					}
					if(linkStatus == 2 && s.status != 1){
						linkStatus = s.status;
					}
					if(linkStatus == 3 && s.status != 1 &&  s.status != 2){
						linkStatus = s.status;
					}
					if(linkStatus == 4 && s.status != 1 &&  s.status != 2 &&  s.status != 3){
						linkStatus = s.status;
					}
					return s;
				})
				gate.link_status = linkStatus;
				return gate;
			})
			let l = Math.ceil(random(0,4));
		    wsSend("data", client_uuid, nickname, {
				link_status: l,
				errorTitle: '网络延迟',
				errors: [{
					name:'物业服务器',
					type: l,
					val: _cur.park_name
				}],
				gate_list: _cur.gate_list
		    });
		}else{
		    wsSend("data", client_uuid, nickname, {});
		}
	}
}