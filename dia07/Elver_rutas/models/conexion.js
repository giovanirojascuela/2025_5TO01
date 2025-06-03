import mysql from "mysql";
import dbconfig from "../config/databases.js";
var sql=mysql.createPool({
    host:dbconfig.HOST,
    user:dbconfig.USER,
    password:dbconfig.PASSWORD,
    database:dbconfig.DB
})
export default sql;
//module.exports=conexion;