const os = require('node:os');

console.log("Información del sistema operativo");
console.log("_______________________________");
console.log("Nombre del SO:", os.platform());
console.log("Versión del SO:", os.release());
console.log("Arquitectura del SO:", os.arch());
console.log("CPUs del SO:", os.cpus().length);
console.log("Memoria libre del SO:", os.freemem(), "bytes");
console.log("Memoria total del SO:", os.totalmem(), "bytes");
console.log("Tiempo activo del SO:", os.uptime(), "segundos");
