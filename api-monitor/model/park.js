/*
 * @Author: askMeWhy
 * @Date:   2018-10-18 11:14:20
 * @Last Modified by:   bigwave
 * @Last Modified time: 2018-10-25 16:31:25
 */
let ParkModel = [{
		// "park_id": 104536,
		"park_id": 217965,
		"park_name": "星语双城一期",
		"link_status": 1
	},
	{
		"park_id": 105633,
		"park_name": "星语双城二期",
		"link_status": 1
	},
	{
		"park_id": 107793,
		"park_name": "autojava停车场",
		"link_status": 1
	},
	{
		"park_id": 107916,
		"park_name": "名人苑",
		"link_status": 1
	},
	{
		"park_id": 109157,
		"park_name": "导入数据测试",
		"link_status": 1
	},
	{
		"park_id": 110488,
		"park_name": "瑞升丽苑",
		"link_status": 1
	},
	{
		"park_id": 111069,
		"park_name": "东辰瑞景",
		"link_status": 1
	},
	{
		"park_id": 112203,
		"park_name": "维权规范性加工费此计划是肯定急急的很好金",
		"link_status": 1
	},
	{
		"park_id": 116188,
		"park_name": "琼姐测试分组停车场",
		"link_status": 1
	},
	{
		"park_id": 116794,
		"park_name": "测试停车场123",
		"link_status": 1
	},
	{
		"park_id": 116899,
		"park_name": "恋日D区",
		"link_status": 1
	},
	{
		"park_id": 117543,
		"park_name": "恋日G区",
		"link_status": 1
	},
	{
		"park_id": 119818,
		"park_name": "房号测试停车场",
		"link_status": 1
	},
	{
		"park_id": 120027,
		"park_name": "测试007",
		"link_status": 1
	},
	{
		"park_id": 125399,
		"park_name": "哈哈",
		"link_status": 1
	},
	{
		"park_id": 125472,
		"park_name": "竹园",
		"link_status": 1

	}
];
function buildModel(){
	let data = [];
	data = ParkModel.map(cur=>{
		let curModel = {
			...cur
		}
		curModel['gate_list'] = Array.apply(null, { length: 4 }).map((i, l) => {
			return {
				gate_id: ''+cur.park_id + '00' + (l+1),
				gate_name: cur.park_name + '门岗' + l,
				link_status: 1,
				children: [
				    {
				        "name": "工控机",
				        "type": 3,
				        "status": 1,
				        "errorTitle": "网络故障",
				        "errors": [
				        {
							name: '通道1',
							type: 2,
							val: '工控机 IP:192.168.168.168'
						},
						{
							name: '通道2',
							type: 3,
							val: '工控机 IP:192.168.168.168'
						},
						{
							name: '通道3',
							type: 4,
							val: '工控机 IP:192.168.168.168'
						}]
				    },
				    {
				        "name": "ETC",
				        "type": 4,
				        "status": 1,
				        "errorTitle": "网络故障",
				        "errors": [
				        {
							name: '通道1',
							type: 2,
							val: 'ETC IP:192.168.168.168'
						},
						{
							name: '通道2',
							type: 3,
							val: 'ETC IP:192.168.168.168'
						},
						{
							name: '通道3',
							type: 4,
							val: 'ETC IP:192.168.168.168'
						}]
				    },
				    {
				        "name": "道闸",
				        "type": 1,
				        "status": 1,
				        "errorTitle": "",
				        "errors": [
				        {
							name: '通道1',
							type: 2,
							val: '道闸 IP:192.168.168.168'
						},
						{
							name: '通道2',
							type: 3,
							val: '道闸 IP:192.168.168.168'
						},
						{
							name: '通道3',
							type: 4,
							val: '道闸 IP:192.168.168.168'
						}]
				    },
				    {
				        "name": "摄像机",
				        "type": 2,
				        "status": 1,
				        "errorTitle": "网络故障",
				        "errors": [
				        {
							name: '通道1',
							type: 2,
							val: '摄像机 IP:192.168.168.168'
						},
						{
							name: '通道2',
							type: 3,
							val: '摄像机 IP:192.168.168.168'
						},
						{
							name: '通道3',
							type: 4,
							val: '摄像机 IP:192.168.168.168'
						}]
				    },
				    {
				        "name": "费显",
				        "type": 5,
				        "status": 1,
				        "errorTitle": "网络故障",
				        "errors": [
				        {
							name: '通道1',
							type: 2,
							val: '费显 IP:192.168.168.168'
						},
						{
							name: '通道2',
							type: 3,
							val: '费显 IP:192.168.168.168'
						},
						{
							name: '通道3',
							type: 4,
							val: '费显 IP:192.168.168.168'
						}]
				    }
				]
			};
		})
		return curModel;
	})
	return data;
}
const ParkGateModel = buildModel();
module.exports = { ParkModel,ParkGateModel};