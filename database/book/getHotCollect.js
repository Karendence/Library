const mysql = require('mysql')
const Q = require('q')
const connect = require('../connect')

function getHotCollect(){
  let connection = connect.getConnection()
  let string1 = 'SELECT id,bookName,count(*) as count,img from library.collect as a INNER JOIN library.book as b ON a.bookid=b.id group by bookid order by count desc limit 11'
  let deferred = Q.defer()
  connection.query(string1, (err,data)=>{
    if (err){
      deferred.reject(err)
    }
    else
      deferred.resolve(data)
  })
  connection.end()
  return deferred.promise
}

exports.getHotCollect = getHotCollect

// getHotCollect().then((res)=>{
//   console.log(res)
// })

