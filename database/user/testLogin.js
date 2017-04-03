const mysql = require('mysql')
const Q = require('q')
const connect = require('../connect')

function testLogin(id, pwd) {
  let connection = connect.getConnection()
  let string1 = "SELECT id,name,img FROM library.user where id = \"" +id +"\"and password =\""+pwd+"\""
  let deferred = Q.defer()
  connection.query(string1, (err, data) => {
    if (err)
      deferred.reject(err)
    else if(data.length!=0){
      let dataInfo = {
        id:data[0].id,
        name:data[0].name,
        img:data[0].img
      }
      deferred.resolve(dataInfo)
    }
    else 
      deferred.resolve(data)
  })
  connection.end()
  return deferred.promise
}

exports.testLogin = testLogin

// testLogin(123,"dfsd").then((result)=>{
//   if(result.length==1) console.log("111")
//   else console.log("222")
// })