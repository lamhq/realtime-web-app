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


function watchFileChange(filename, cb) {
  let lastMod;
  const check = () => {
    curMod = getFileLastModified(filename);
    if (!lastMod || lastMod !== curMod) {
      lastMod = curMod;
      cb();
    }
  };
  const intervalId = setInterval(check, 50);
  return () => clearInterval(intervalId);
}

module.exports = {
  getFileContent,
  getFileLastModified,
  waitForFileChange,
  watchFileChange,
};

