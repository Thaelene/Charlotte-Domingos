// devDependencies
const gulp = require('gulp'),
  del = require('del');
// TOOLS
(gulp_rename = require('gulp-rename')),
  (gulp_plumber = require('gulp-plumber')),
  (gulp_sourcemaps = require('gulp-sourcemaps')),
  (notifier = require('node-notifier'));
(gulp_notify = require('gulp-notify')),
  (gulp_clean = require('gulp-clean')),
  (gulp_browsersync = require('browser-sync').create()),
  (gulp_fileinclude = require('gulp-file-include')),
  // CSS
  (gulp_sass = require('gulp-sass')),
  (gulp_autoprefixer = require('gulp-autoprefixer')),
  (gulp_cssnano = require('gulp-cssnano')),
  //JS
  (browserify = require('browserify')),
  (babelify = require('babelify')),
  (buffer = require('vinyl-buffer')),
  (source = require('vinyl-source-stream')),
  (es2015 = require('babel-preset-es2015')),
  (gulp_uglify = require('gulp-uglify')),
  // IMAGES
  (gulp_imagemin = require('gulp-imagemin'));

// INIT

// CONFIG
const config = {
  dist: 'dist/',
  src: 'src/',
  assets: 'dist/assets/'
};

// BUILT
gulp.task(
  'build',
  gulp.series(
    clean,
    gulp.parallel(favicon, fonts, pages, sass, html, js, images),
    done => {
      done();
    }
  )
);

// GULP
gulp.task(
  'default',
  gulp.series(
    clean,
    gulp.parallel(
      browsersync,
      favicon,
      fonts,
      pages,
      sass,
      html,
      js,
      images,
      watch
    ),
    () => {}
  )
);

function gulp_reload(done) {
  gulp_browsersync.reload();
  done();
}

// WATCH FILES CHANGE
function watch() {
  gulp.watch(config.src + 'styles/**/*.scss', gulp.series(sass, gulp_reload));
  gulp.watch(config.src + 'js/**/*.js', gulp.series(js, gulp_reload));
  gulp.watch(config.src + 'views/**.html', gulp.series(html, gulp_reload));
  gulp.watch(
    config.src + 'views/pages/**.html',
    gulp.series(pages, gulp_reload)
  );
}

// BROWSER SYNC & LAUNCH
function browsersync() {
  gulp_browsersync.init({
    server: {
      baseDir: 'dist/'
    }
  });
}

// CLEAN DIST
function clean() {
  return del(['dist']);
  // return gulp.src('dist/', {
  //         read: false
  //     })
  //     .pipe(gulp_clean({
  //         force: true
  //     }))
}

// GULP TASKS

// move fonts to dist
function fonts() {
  return gulp
    .src(config.src + 'fonts/**/**')
    .pipe(gulp.dest(config.assets + 'fonts'));
}

// move favicon to dist
function favicon() {
  return gulp
    .src(config.src + 'favicon/**')
    .pipe(gulp.dest(config.dist + 'favicon'));
}

// minimify images
function images() {
  return gulp
    .src(config.src + 'img/**')
    .pipe(gulp_imagemin())
    .pipe(gulp.dest(config.assets + 'img'));
}

// SASS --> CSS --> Autoprefix --> Rename
function sass() {
  return gulp
    .src(config.src + 'styles/main.scss')
    .pipe(
      gulp_plumber({
        errorHandler: gulp_notify.onError('SASS Error: <%= error.message %>')
      })
    )
    .pipe(gulp_sourcemaps.init())
    .pipe(gulp_sass().on('error', gulp_sass.logError))
    .pipe(
      gulp_autoprefixer({
        browsers: ['last 2 versions']
      })
    )
    .pipe(gulp_cssnano())
    .pipe(gulp_sourcemaps.write())
    .pipe(gulp_rename('main.min.css'))
    .pipe(gulp.dest(config.assets + 'css'))
    .pipe(gulp_notify('SASS compiled: <%= file.relative %>'));
}

function html() {
  return gulp
    .src(config.src + 'views/*.html')
    .pipe(gulp.dest(config.dist))
    .pipe(gulp_notify('HTML updated'));
}

// function fileinclude() {
//     return gulp.src(config.src + 'views/index.html')
//         .pipe(gulp_fileinclude({
//             prefix: '@@',
//             basepath: '@file'
//         }))
//         .pipe(gulp.dest(config.dist))
//         .pipe(gulp_notify('HTML updated'))
// }

function pages() {
  return gulp
    .src(config.src + 'views/pages/**.html')
    .pipe(gulp.dest(config.dist + 'pages'))
    .pipe(gulp_notify('Pages have been updated'));
}

// All js --> One js --> Uglify
function js() {
  return browserify(config.src + 'js/main.js', {
    debug: true
  })
    .transform(babelify, {
      presets: [es2015]
    })
    .bundle()
    .on(
      'error',
      gulp_notify.onError(function(error) {
        return 'Message to the notifier: ' + error.message;
      })
    )
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp_sourcemaps.init())
    .pipe(gulp_uglify())
    .pipe(gulp_sourcemaps.write())
    .pipe(gulp_rename('main.min.js'))
    .pipe(gulp.dest(config.assets + 'js/'))
    .pipe(gulp_notify('JS compiled'));
}
