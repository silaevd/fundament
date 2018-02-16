var
  gulp         = require('gulp'), // Подключаем Gulp
  sass         = require('gulp-sass'), //Подключаем Sass пакет,
  browserSync  = require('browser-sync'), // Подключаем Browser Sync
  concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
  uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
  // cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
  // rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
  del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
  cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
  autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('sass', function(){ // Создаем таск Sass
  return gulp.src('app/src/sass/**/main.scss') // Берем источник
  .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
  .pipe(gulp.dest('app/src/css')) // Выгружаем результата в папку app/css
  .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});


gulp.task('browser-sync', function() { // Создаем таск browser-sync
  browserSync({ // Выполняем browserSync
  server: { // Определяем параметры сервера
  baseDir: 'app' // Директория для сервера - app
  },
  notify: false, // Отключаем уведомления
  open: false
  });
});

gulp.task('scripts', function() {
  return gulp.src([ // Берем все необходимые библиотеки
    'node_modules/jquery/dist/jquery.min.js', // Берем jQuery
    // 'app/libs/smoothscroll-for-websites/SmoothScroll.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
  ])
  .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
  .pipe(uglify()) // Сжимаем JS файл
  .pipe(gulp.dest('app/src/js')); // Выгружаем в папку app/js
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function() {
  gulp.watch('app/src/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
  gulp.watch('app/src/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
  gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('clean', function() {
  return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('build', ['clean', 'sass', 'scripts'], function() {

  var buildCss = gulp.src([ // Переносим библиотеки в продакшен
  'app/src/css/main.css',
  ])
  .pipe(gulp.dest('dist/src/css'))

  var buildFonts = gulp.src('app/src/fonts/**/*') // Переносим шрифты в продакшен
  .pipe(gulp.dest('dist/src/fonts'))

  var buildJs = gulp.src('app/src/js/**/*') // Переносим скрипты в продакшен
  .pipe(gulp.dest('dist/src/js'))

  var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
  .pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
  return cache.clearAll();
})

gulp.task('default', ['watch']);
