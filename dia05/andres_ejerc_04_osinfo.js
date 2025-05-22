const os = require('node:os');

console.log("Información del sistema operativo");
console.log("_______________________");
console.log("Nombre SO:", os.platform());
console.log("Versión SO:", os.release());
console.log("Arquitectura SO:", os.arch());
console.log("CPUs SO:", os.cpus());
console.log("Memoria libre SO (MB):", os.freemem() / 1024 / 1024);
console.log("Uptime SO (horas):", os.uptime() / 60 / 60);
