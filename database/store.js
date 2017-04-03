const mysql = require('mysql')
const Q = require('q')
const connect = require('./connect')

function store(id,oriname,name,type,size){
  let connection = connect.getConnection()
  let string1 = 'INSERT INTO `library`.`RunorRou` (`userid`, `oriname`, `name`, `type`,`size`) VALUES (\''+id+'\', \''+oriname+'\', \''+name+'\', (SELECT `id` FROM library.runtype where contain like \'%,'+type+',%\'), \''+size+'\')'
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

exports.store = store