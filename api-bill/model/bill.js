/*
 * @Author: askMeWhy
 * @Date:   2017-09-20 11:16:10
 * @Last Modified by:   bigWave
 * @Last Modified time: 2017-12-19 15:22:06
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema,
	model = mongoose.model.bind(mongoose),
	ObjectId = mongoose.Schema.Types.ObjectId;

const billSchema = Schema({
	id: ObjectId,
	name: String,
	create: String,
	price: Number,
	list: String
});

const userSchema = Schema({
	id:ObjectId,
	name: String,
	logo: String,
	sex: String
})
const listSchema = Schema({
	id:ObjectId,
	user:{ type:Object,ref:'UserList'},
	pay: Number,
	items: [{name:String,value:String|Number}]
})
/*const personalListSchema = Schema({
	id:ObjectId,
	user: { type: ObjectId, ref: 'UserList' },
	pay: Number,
	price: Number,
	detail: {type: ObjectId, ref: 'Detail'}
})

const detailSchema = Schema({
	id:ObjectId,
	items: String
})*/

const Bill = model('Bill', billSchema);
// const PersonalList = model('PersonalList', personalListSchema);
const UserList = model('UserList', userSchema);
const List = model('List', listSchema);
// const Detail = model('Detail', detailSchema);


module.exports = { Bill,UserList,List };
