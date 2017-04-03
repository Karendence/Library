const mysql = require('mysql')
const Q = require('q')
const connect = require('../connect')

function getNewBook(){
	let connection = connect.getConnection()
	let string1 = 'SELECT id,bookName,img,date_format(registeDate,\'%Y-%m-%d\') as registeDate FROM library.book group by id order by registeDate desc limit 5'
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

exports.getNewBook = getNewBook