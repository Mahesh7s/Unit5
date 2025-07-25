const fs = require("fs");

function readData(callback) {
  fs.readFile("./data.txt", "utf-8", (err, data) => {
    if (err) return callback(err, null);
    callback(null, data);
  });
}

module.exports = readData;