const gulp         = require( 'gulp' ),

    // Utility dependencies
    gulp_rename  = require('gulp-rename'),
    gulp_plumber = require ('gulp-plumber'),
    gulp_sourcemaps = require ('gulp-sourcemaps'),
    gulp_notify = require('gulp-notify'),
    gulp_connect = require ('gulp-connect')

    // CSS
    gulp_cssnano = require('gulp-cssnano'),
    gulp_autoprefixer = require ( 'gulp-autoprefixer' ),
    gulp_sass = require('gulp-sass'),

    // JS
    gulp_uglify  = require('gulp-uglify'),
    gulp_concat = require('gulp-concat'),

    // Images
    gulp_imagmin = require ('gulp-imagemin');

const config = {
    'dist': 'dist/',
    'src' : 'src/',
    'assets': 'dist/assets/'
}

// Running it by the command line : gulp
gulp.task( 'default', [ 'watch', 'connect' ], function() {} );

// Scss into css, minifies and rename it "style.min.css"
gulp.task('sass', function () {
    return gulp.src(config.src + 'scss/main.scss')
    .pipe(gulp_plumber({
        errorHandler: gulp_notify.onError('SASS Erro  <%= error.message %>')
    }))
    .pipe(gulp_sourcemaps.init())
    .pipe(gulp_sass({
        outputStyle: 'compressed'}).on('error', gulp_sass.logError))
    .pipe(gulp_sourcemaps.write())
    .pipe(gulp_autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
    .pipe(gulp_rename('style.min.css'))
    .pipe(gulp.dest(config.assets + 'css'))
    .pipe(gulp_connect.reload())
    .pipe(gulp_notify('SASS has been compiled !'))
});

// Concats and uglifies js files
// If several js files, please add them on line 74
gulp.task( 'javascript', function()
{
    return gulp.src( [
            './src/js/main.js'
        ] )
        .pipe(gulp_plumber({
            errorHandler: gulp_notify.onError("JS Error: <%= error.message %>")
        }))
        .pipe(gulp_sourcemaps.init())
        .pipe( gulp_concat( 'main.min.js' ) )
        .pipe( gulp_uglify() )
        .pipe(gulp_sourcemaps.write())
        .pipe( gulp.dest(config.assets + 'js' ) );
} );

gulp.task( 'masonry', function()
{
    return gulp.src( './src/js/masonry.js' )
        .pipe(gulp_plumber({
            errorHandler: gulp_notify.onError("JS Error: <%= error.message %>")
        }))
        .pipe(gulp_sourcemaps.init())
        .pipe( gulp_concat( 'masonry.min.js' ) )
        .pipe( gulp_uglify() )
        .pipe(gulp_sourcemaps.write())
        .pipe( gulp.dest(config.assets + 'js' ) );
} );


// Minifies images
gulp.task('imagemin', function()
{
    return gulp.src(config.src + 'img/*')
        .pipe(gulp_imagmin())
        .pipe(gulp.dest(config.assets + 'img'))
        .pipe(gulp_connect.reload())
        .pipe(gulp_notify('Images minified!'))
});

// Autoreload setup
gulp.task('connect', function() {
  gulp_connect.server({
    port : 8080,
    root: 'dist/',
    livereload: true
  });
});

// Html move to dist + Autoreload task
gulp.task('html', function () {
  return gulp.src(config.src + '*.html')
  .pipe(gulp.dest(config.dist))
  .pipe(gulp_connect.reload())
});

// Watches files change and launches relatives tasks
gulp.task( 'watch', function()
{
    gulp.watch(config.src + 'scss/**/*.scss', [ 'sass' ] );
    gulp.watch(config.src + 'js/*.js', [ 'javascript' ] );
    gulp.watch(config.src + '*.html', ['html']);
} );
