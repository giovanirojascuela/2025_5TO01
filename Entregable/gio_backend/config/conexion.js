// models/conexion.js
import mysql from "mysql2";
import dbconfig from "../models/database.js";

const conexion = mysql.createPool({
  host: dbconfig.HOST,
  user: dbconfig.USER,
  password: dbconfig.PASSWORD,
  database: dbconfig.DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default conexion;
