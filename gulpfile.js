var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var config = require('./config/config');
var doc = require('./api/swagger/index.json');

gulp.task('swagger', function () {
  config.getGlobbedFiles('./api/swagger/**/*.json').forEach((routePath) => {
    const excludeFile = 'index.json';

    if (path.basename(routePath) === excludeFile) return false;
    var file = require(routePath);
    for (var key in file) {
      doc.paths[key] = file[key];
    }
    fs.writeFileSync(
      path.join(__dirname, './public/swagger.json'),
      JSON.stringify(doc, null, ' ')
    );
  });
});

gulp.task('default', [ 'swagger' ]);
