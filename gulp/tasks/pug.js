'use strict';

module.exports = function() {
  const patterns = [];
  $.gulp.task('pug', function() {
    patterns.push({ match: '%=suffix=%', replace: $.dev ? '' : '.min' });
    patterns.push({ match: '%=version=%', replace: $.dev ? '' : `?rel=${$.package.version}` });//Math.ceil(Math.random()*100000)

    return $.gulp.src('./source/template/pages/*.pug')
      .pipe($.gp.wait(500))
      .pipe($.gp.pug({ 
        locals: JSON.parse($.fs.readFileSync('./content.json', 'utf8')),
        pretty: true 
      }))
      .on('error', $.gp.notify.onError(function(error) {
        return {
          title: 'Pug',
          message:  error.message
        };
      }))
      .pipe($.gp.replaceTask({ patterns, usePrefix: false }))
      .pipe($.gulp.dest($.config.root));
  });
};
