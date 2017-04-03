const mysql = require('mysql')
const Q = require('q')
const connect = require('../connect')

function getInfo(id){
  let connection = connect.getConnection()
  let string1 = 'SELECT id,name,password,gender,address,department,phone,date_format(birthdate,\'%Y-%m-%d\') as birthdate,img FROM library.user where `id`='+id
  let deferred = Q.defer()
  connection.query(string1, (err,data)=>{
    if (err)
      deferred.reject(err)
    else{
      if(data[0].gender.toString()!=""){
        data[0].gender="女"
      }
      else{
        data[0].gender="男"
      }
      deferred.resolve(data)
    }
  })
  connection.end()
  return deferred.promise
}

exports.getInfo = getInfo