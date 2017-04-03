const mysql = require('mysql')
const Q = require('q')
const connect = require('../connect')


////需要判断是否已经收藏过
function isCollected(userid,bookid){
  let connection = connect.getConnection()
  let string1 = 'SELECT * FROM library.collect where userid = \''+userid+'\' and bookid = \''+bookid+'\''
  let deferred = Q.defer()
  connection.query(string1,(err,data)=>{
    if(err)
      deferred.reject(err)
    else
      deferred.resolve(data)
  })
  connection.end()
  return deferred.promise
}

function collect(userid,bookid){
  let connection = connect.getConnection()
  let string1 = 'INSERT INTO `library`.`collect` (`userid`, `bookid`) VALUES (\''+userid+'\', \''+bookid+'\')'
  let deferred = Q.defer()
  isCollected(userid,bookid).then((data)=>{
    if(data.length!=0){
      deferred.resolve({answer:"Collected Already!"})
    }
    else{
      connection.query(string1, (err,data)=>{
        if (err){
          deferred.reject(err)
        }
        else{
          deferred.resolve({answer:"Collected Success!"})
        }
      })
      connection.end()
    }
  })
  return deferred.promise
}

exports.collect = collect

// collect(123,"I712.451947").then((res)=>{
//   console.log(res)
// })