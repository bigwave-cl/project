/*
 * @Author: askMeWhy
 * @Date:   2018-10-18 10:15:52
 * @Last Modified by:   bigwave
 * @Last Modified time: 2018-10-18 10:28:44
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
	portfinder.basePort = process.env.PORT || '3000'
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
