/*
* @Author: askMeWhy
* @Date:   2018-10-18 10:41:26
* @Last Modified by:   AskMeWhy
* @Last Modified time: 2020-02-26 17:58:48
*/
var result = {
	appVersion: '1.1.2'
}
const versionController = {
	update(req,res){
		var appName = req.query.name;
		var appVersion = req.query.version;  
		var currentVersions = appVersion.split('.');  
		var resultVersions = result.appVersion.split('.');  
		var p = {};
		if(currentVersions[0] === resultVersions[0] &&
			currentVersions[1] === resultVersions[1] && 
			currentVersions[2] === resultVersions[2]){
			p = {
				update: 0,
				msg: '暂无更新'
			}
		}else{
			p = {
				update: 1,
				msg: '版本更新',
				versionCode: result.appVersion,
				wgtUrl: 'http://47.107.171.42:8189/__UNI__A7A0676.wgt'
			}
		}
		res.json({
			data: p,
			code: 200
		});
	}
};

module.exports = {versionController};