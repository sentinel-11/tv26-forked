const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Punee\\VSCode\\Projects\\tv-26\\tv26-forked\\src';

function walk(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
}

walk(dir, function(err, results) {
  if (err) throw err;
  results.forEach(file => {
    if (file.endsWith('.js') || file.endsWith('.jsx')) {
      let content = fs.readFileSync(file, 'utf8');
      
      let newContent = content.replace(/(className=[\"'][^\"']*)text-\[\#00FF41\]([^\"']*[\"'])/g, function(match, p1, p2) {
          let res = p1 + 'text-[#13EC49]' + p2;
          res = res.replace(/\s*\bdrop-shadow-[a-z0-9]+\b/g, '');
          return res;
      });
      
      if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Updated ' + file);
      }
    }
  });
});
