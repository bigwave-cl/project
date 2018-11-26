/*
* @Author: AskMeWhy
* @Date:   2018-11-21 15:48:05
* @Last Modified by:   bigwave
* @Last Modified time: 2018-11-21 17:43:25
*/
//合并对象
const merge = (...arg) => {
	if (arg.length == 0) {
		throw Error(`merge error=>请传入需要合并的对象`);
	}
	let target = arg[0] || {},
		depath = false,
		length = arg.length,
		i = 1;

	if (Object.prototype.toString.call(target) == '[object Boolean]') {
		depath = target;
		target = arg[i];
		i++
	}

	if (typeof target !== "object") {
		target = {};
	}

	if (i == 2 && length <= 1) {
		throw Error(`merge error=>请传入需要合并的对象`);
	}

	for (; i < length; i++) {
		let source = arg[i] || {};
		if (source != null) {
			for (let key in source) {
				let src = target[key],
					copy = source[key];
				if (target === copy) {
					continue;
				}
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					if (depath && copy && (isObject(copy) || Array.isArray(copy))) {
						let clone;
						if (Array.isArray(copy)) {
							clone = src && Array.isArray(src) ? src : [];
						} else {
							clone = src && isObject(src) ? src : {};
						}
						target[key] = merge(depath, clone, copy);
					} else if (copy !== void 0) {
						target[key] = copy;
					}
				}
			}
		}
	}
	return target;
}

const isObject = (target) => {
	return Object.prototype.toString.call(target) === '[object Object]';
}

let onlyId = 1;
let tags = ['Vue.js','Element-Ui','Vee-validate','Swiper','D3.js'];
class ProjectSecmal{
	constructor(params = {}) {
		merge(true, this, {
			id: onlyId++,
			name: params.name,
			desc: params.desc,
			link: params.link,
			cover: params.cover,
			startTime: params.startTime,
			endTime: params.endTime,
			tag: params.tag,
		})
		return this;
	}
}
const ProjectModel = [
	new ProjectSecmal({
		name: 'AskMeWhy',
		desc: '这是项目的描述性文字<br/>登录账号:12345<br/>登录密码:123456',
		link: 'https://www.baidu.com',
		cover: 'http://static.699pic.com/images/index/pet-img.png',
		startTime: '2016-11-11',
		endTime: '未知',
		tag: tags,
	}),
	new ProjectSecmal({
		name: 'AskMeWhy2',
		desc: '这是项目的描述性文字<br/>登录账号:12345<br/>登录密码:123456',
		link: 'https://www.baidu.com',
		cover: 'http://static.699pic.com/images/index/pet-img.png',
		startTime: '2016-11-11',
		endTime: '未知',
		tag: tags.slice(0,2),
	})
]

module.exports = { ProjectModel };