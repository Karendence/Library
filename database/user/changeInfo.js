const mysql = require('mysql')
const Q = require('q')
const connect = require('../connect')

function changeInfo(data){
  let connection = connect.getConnection()
  let [a,...b]=data
  let string =''
  b.map((res)=>{
    if(res[0]!="gender")
      string +=res[0]+" = '"+res[1]+"',"
    else{
      if(res[1]=="female")
        string +=res[0]+" = (0),"
      else
        string +=res[0]+" = (1),"
    }
  })
  string2 = "UPDATE `library`.`user` SET "+string.substr(0,string.length-1)+" where `id` ="+a[1]
  let deferred = Q.defer()
  connection.query(string2, (err,data)=>{
    if (err)
      deferred.reject(err)
    else{
      deferred.resolve({result:"success"})
    }
  })
  connection.end()
  return deferred.promise
}

exports.changeInfo = changeInfo