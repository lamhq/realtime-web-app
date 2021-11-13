const fs = require('fs');

function getFileLastModified(filename) {
  return fs.statSync(filename).mtime.getTime();
}

function getFileContent(filename) {
  return fs.readFileSync(filename, 'utf8');
}

function waitForFileChange(filename, version) {
  return new Promise((rs) => {
    const checkFileModified = () => {
      if (version < getFileLastModified(filename)) {
        rs();
      } else {
        setTimeout(checkFileModified, 50);
      }  
    }
    checkFileModified();
  })
}

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
  getFileContent,
  getFileLastModified,
  waitForFileChange,
  watchFileChange,
};

