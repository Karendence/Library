const mysql = require('mysql')
const Q = require('q')
const connect = require('./connect')

function rungetStore(id){
  let connection = connect.getConnection()
  let string1 = 'SELECT a.oriname,b.typeName,a.size,a.name FROM library.runorrou as a,library.runtype as b where a.userid = '+id+' and a.type = b.id'
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

exports.rungetStore = rungetStore