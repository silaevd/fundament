var
  gulp         = require('gulp'),
  sass         = require('gulp-sass'),
  browserSync  = require('browser-sync'),
  concat       = require('gulp-concat'),
  uglify       = require('gulp-uglifyjs'),
  del          = require('del'),
  cache        = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer'),
  tinypng      = require('gulp-tinypng');

gulp.task('sass', function(){
  return gulp.src('app/src/sass/**/main.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(gulp.dest('app/src/css'))
  .pipe(browserSync.reload({stream: true}))
});


gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false,
    open: false
  });
});

gulp.task('scripts', function() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
    'node_modules/jquery.inputmask/dist/jquery.inputmask.bundle.js',
  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/src/js'));
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function() {
  gulp.watch('app/src/sass/**/*.scss', ['sass']);
  gulp.watch('app/src/js/**/*.js', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
});

// gulp.task('tinypng', function () {
//     gulp.src('src/images/**/*.{png,jpg,jpeg}')
//         .pipe(tinypng('PnH7xO5XhZ-FNHpwew83XbBfGLD5wk97'))
//         .pipe(gulp.dest('dist/src/images'));
// });

gulp.task('clean', function() {
  return del.sync('dist');
});

gulp.task('build', ['clean', 'sass', 'scripts'], function() {

  var buildCss = gulp.src([
  'app/src/css/main.css',
  ])
  .pipe(gulp.dest('dist/src/css'));

  var buildFonts = gulp.src('app/src/fonts/**/*')
  .pipe(gulp.dest('dist/src/fonts'));

  var buildJs = gulp.src('app/src/js/**/*')
  .pipe(gulp.dest('dist/src/js'));

  var buildJs = gulp.src('app/src/images/**/*')
  .pipe(gulp.dest('dist/src/images'));

  var buildHtml = gulp.src('app/*.html')
  .pipe(gulp.dest('dist'));

  var buildPhp = gulp.src('app/*.php')
      .pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
  return cache.clearAll();
})

gulp.task('default', ['watch']);
