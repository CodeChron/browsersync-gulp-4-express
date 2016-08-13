var 
  gulp         = require('gulp'),
  config       = require('./config/gulp'),
  del          = require('del'),
  nodemon      = require('gulp-nodemon'),
  browserSync  = require('browser-sync').create()
;

// CLEAN
gulp.task('clean', function() {
  return del(config.paths.dist_dir);
});

// VIEWS
gulp.task('dev:views', function() {
  return gulp
    .src(config.paths.views.src)
    //Process views
    .pipe(gulp.dest(config.paths.views.dist))
})
gulp.task('watch:views', function() {
  gulp.watch(config.paths.views.src, gulp.series('dev:views'));
})

//STYLES
gulp.task('dev:styles', function() {
  return gulp
    .src(config.paths.styles.src)
    //Process styles
    .pipe(gulp.dest(config.paths.styles.dist))
})
gulp.task('watch:styles', function() {
  gulp.watch(config.paths.styles.src, gulp.series('dev:styles'));
})

//SERVER
gulp.task('server', function (cb) {
  var called = false;
  return nodemon(config.plugins.nodemon)
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
});

// BROWSER-SYNC
gulp.task('browser-sync', function() {
  browserSync.init(config.plugins.browserSync);
});


//DEV
gulp.task('dev', gulp.parallel('dev:styles', 'dev:views'));

//WATCH
gulp.task('watch', gulp.parallel('watch:styles', 'watch:views'));

//DEFAULT
gulp.task('default', gulp.series('clean', 'dev', 'server', gulp.parallel('watch', 'browser-sync')));

