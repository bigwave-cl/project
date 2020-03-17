/*
 * @Author: askMeWhy
 * @Date:   2018-10-18 10:15:52
 * @Last Modified by:   AskMeWhy
 * @Last Modified time: 2020-02-26 18:34:11
 */

let os = require('os'),
	iptable = {},
	ifaces = os.networkInterfaces();
for (let dev in ifaces) {
	ifaces[dev].forEach(function(details, alias) {
		if (details.family == 'IPv4') {
			iptable[dev + (alias ? ':' + alias : '')] = details.address;
		}
	});
}
let portfinder = require('portfinder');

module.exports = new Promise((resolve, reject) => {
	portfinder.basePort = process.env.PORT || '8281'
	portfinder.getPort((err, port) => {
		if (err) {
			reject(err)
		} else {
			// publish the new Port, necessary for e2e tests
			process.env.PORT = port;
			console.log(iptable,process.env.PORT);
			resolve({
				port: port
			})
		}
	})
})
