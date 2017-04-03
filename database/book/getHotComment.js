const mysql = require('mysql')
const Q = require('q')
const connect = require('../connect')

function getHotComment(){
	let connection = connect.getConnection()
	let string1 = 'select b.id,b.bookName,b.img,count(*) AS count from library.comment as a,library.book as b where a.bookid=b.id group by b.id order by count DESC limit 11'
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

exports.getHotComment = getHotComment

// getHotComment().then((res)=>{
// 	console.log(res)
// })