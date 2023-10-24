import mysql from 'mysql'

const mysqlAdminData = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'nmdzz000',
  database: 'dst_manage_system',
})

const dbQuery = function (sql: string, values: Array<any>) {
  return new Promise((resolve, reject) => {
    mysqlAdminData.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, result) => {
          connection.release()
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      }
    })
  })
}

export default dbQuery
