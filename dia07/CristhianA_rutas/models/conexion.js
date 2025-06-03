import  mysql, { createPool }  from 'mysql'
import dbconfig from '../config/database.js'
var conexion=mysql.createPool({
    host: dbconfig.HOST,
    user: dbconfig.USER,
    password: dbconfig.PASSWORD,
    database: dbconfig.DB,
})
module.exports = conexion;