import mysql from "mysql2";
import dbconfig from "../config/database.js";
var conexion=mysql.createPool({
    host: dbconfig.HOST,
    user:dbconfig.USER,
    password:dbconfig.PASSWORD,
    database:dbconfig.DB
})
export default conexion;
