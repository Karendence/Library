const mysql = require('mysql')
const Q = require('q')
const connect = require('../connect')

function getBook(){
	let connection = connect.getConnection()
	let string1 = 'SELECT * FROM library.book'
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

exports.getBook = getBook
// getBook().then((res)=>{
// 	 app.get('/',(req,res,next)=>{
//     console.log(JSON.stringify(data))
//     res.send(JSON.stringify(data))
//   })
// })
