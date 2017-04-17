const mysql = require('mysql')

function getConnection() {
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '1234567'
    })
    connection.connect()
    return connection
}

exports.getConnection = getConnection