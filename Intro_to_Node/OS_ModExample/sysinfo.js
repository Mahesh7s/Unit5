const os = require("os")
function getSystemInfo(){
const cpus = os.cpus();

  console.log("=== System Information ===");
  console.log("Architecture:", os.arch());
  console.log("OS Type:", os.type());
  console.log("Hostname:", os.hostname());
  console.log("Number of CPU cores:", cpus.length);
  console.log("CPU Model:", cpus[0].model);
  console.log("CPU Speed:", cpus[0].speed + " MHz");
  console.log("Total Memory:", (os.totalmem() / (1024 ** 3)).toFixed(2), "GB");
  console.log("Free Memory:", (os.freemem() / (1024 ** 3)).toFixed(2), "GB");
  console.log("Heap Used (MB):", (process.memoryUsage().heapUsed / (1024 ** 2)).toFixed(2));
  console.log("Heap Total (MB):", (process.memoryUsage().heapTotal / (1024 ** 2)).toFixed(2));
  console.log("==========================");

}


module.exports = getSystemInfo;