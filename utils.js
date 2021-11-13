const fs = require('fs');

let lastMod;

function watchFileChange(filename, cb) {
  const mtime = fs.statSync(filename).mtime;
  if (!lastMod || lastMod.getTime() !== mtime.getTime()) {
    lastMod = mtime;
    cb();
  }
  setTimeout(() => watchFileChange(filename, cb), 50);
}

module.exports = {
  watchFileChange
};