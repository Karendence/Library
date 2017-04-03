const mysql = require('mysql')
const Q = require('q')
const connect = require('./connect')

function store(id,img,type){
	let connection = connect.getConnection()
	let string1 = "UPDATE `library`.`"+type+"` SET `img`=\""+img+"\" WHERE `id`=\""+id+"\""
	let deferred = Q.defer()
	connection.query(string1, (err,data)=>{
		if (err)
			deferred.reject(err)
		else
			deferred.resolve(data)
	})
	connection.end()
	return deferred.promise
}

exports.store = store