const mysql = require('mysql')

function getConnection() {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'wanner1597'
    })
    connection.connect()
    return connection
}

exports.getConnection = getConnection