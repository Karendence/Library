const mysql = require('mysql')
const Q = require('q')
const connect = require('../connect')

function getNews(){
	let connection = connect.getConnection()
	let string1 = 'SELECT id,title,date_format(time,\'%Y-%m-%d\') as "date",img FROM library.news order by time desc limit 8'
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

exports.getNews = getNews

// getNews().then((res)=>{
// 	console.log(res[0])
// })