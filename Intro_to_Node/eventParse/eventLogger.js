// eventLogger.js
const EventEmitter = require("events");
const fs = require("fs");
const path = require("path");

class Logger extends EventEmitter {}

const logger = new Logger();

logger.on("log", (message) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;

  console.log(logEntry); // Logs to console

//   // Bonus: Also write to file
//   const logPath = path.join(__dirname, "logs", "events.log");
//   fs.mkdirSync(path.dirname(logPath), { recursive: true });
//   fs.appendFile(logPath, logEntry, (err) => {
//     if (err) console.error("Error writing log:", err);
//   });
});

module.exports = logger;
