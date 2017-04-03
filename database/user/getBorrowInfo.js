const mysql = require('mysql')
const Q = require('q')
const connect = require('../connect')



function getorder(id){//取得借阅信息，懒得改名字了
  let connection = connect.getConnection()
  let string1 = 'select b.bookName,b.id,c.enDate<now() as isover from library.borrowrec as c,library.book as b,library.user as a where c.readerID = '+id+' and a.id=c.readerID and b.id = c.bookID and c.borrowStatus =(1) group by b.id'
  let deferred = Q.defer()
  connection.query(string1, (err,data)=>{
    if (err)
      deferred.reject(err)
    else{
      deferred.resolve(data)
    }
  })
  connection.end()
  return deferred.promise
}

function getBorrowInfo(id){
  let result = [[],[]]
  let connection=connect.getConnection()
  let string1 = 'SELECT b.bookName,b.id FROM library.`order` as a,library.`book` as b where a.bookID=b.id and readID = '+id
  let deferred = Q.defer()
  getorder(id).then((res)=>{
    res.map((a)=>{
      result[0].push(a)
    })
    connection.query(string1,(err,data)=>{
      if(err)
        deferred.reject(err)
      else{
        data.map((a)=>{
          result[1].push(a)
        })
        deferred.resolve(result)
      }
    })
    connection.end()   
  })
  return deferred.promise 
}
// getorder(321).then((res)=>{
//   console.log(res[1],res[0])
// })


exports.getBorrowInfo = getBorrowInfo


