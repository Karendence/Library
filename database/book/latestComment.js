const mysql = require('mysql')
const Q = require('q')
const connect = require('../connect')

function latestComment(){
  let connection = connect.getConnection()
  let string1 = 'SELECT a.id as id,date_format(a.date,\'%Y-%m-%d\') as date,c.name as username,c.img as userimg,bookName as bookname,a.content,a.cryptonym FROM library.comment as a,library.book as b,library.user as c where a.userid=c.id and a.bookid=b.id group by id order by date desc limit 4'
  let deferred = Q.defer()
  connection.query(string1, (err,data)=>{
    if (err)
      deferred.reject(err)
    else{
      data.map((data)=>{
        if(data.cryptonym.toString()!=""){
          data.username="匿名"
          data.userimg="123.jpg"
        }
      })
      deferred.resolve(data)
    }
  })
  connection.end()
  return deferred.promise
}

exports.latestComment = latestComment

// latestComment().then((res)=>{
//   console.log(res)
// })