// delay.js
function delayMessage(message, time) {
  return new Promise((resolve, reject) => {
    const delayTime = parseInt(time);
    if (isNaN(delayTime) || delayTime < 0) {
      return reject(new Error("Invalid delay time"));
    }

    setTimeout(() => {
      resolve(message);
    }, delayTime);
  });
}

module.exports = delayMessage;
