framework/// Below are all the Gulp Plugins we're using. Their functions can be read on their respective documentation website.
const gulp          = require('gulp'),
      autoprefixer  = require('gulp-autoprefixer'),
      browserSync   = require('browser-sync').create(),
      reload        = browserSync.reload,
      sass          = require('gulp-sass'),
      concat        = require('gulp-concat'),
      minify        = require('gulp-minify'),
      imagemin      = require('gulp-imagemin'),
      cleancss      = require('gulp-clean-css');

const root          = './',
      scss          = root + 'src/scss/',
      js            = root + 'src/js/',
      imgmin        = root + 'src/img/*',
      cssdist       = root + 'assets/css/',
      jsdist        = root + 'assets/js/',
      imgmindist    = root + 'assets/img/';

const htmlWatchFiles    = root + '*.html',
      styleWatchFiles   = scss + '**/*.scss',
      jsWatchFiles      = js + '**/*.js';

const jsframesrc = [
      js + 'framework/cash.js',
      js + 'framework/component.js',
      js + 'framework/global.js',
      js + 'framework/anime.min.js',
      js + 'framework/collapsible.js',
      js + 'framework/dropdown.js',
      js + 'framework/modal.js',
      js + 'framework/materialbox.js',
      js + 'framework/parallax.js',
      js + 'framework/tabs.js',
      js + 'framework/tooltip.js',
      js + 'framework/waves.js',
      js + 'framework/toasts.js',
      js + 'framework/sidenav.js',
      js + 'framework/scrollspy.js',
      js + 'framework/autocomplete.js',
      js + 'framework/forms.js',
      js + 'framework/slider.js',
      js + 'framework/cards.js',
      js + 'framework/chips.js',
      js + 'framework/pushpin.js',
      js + 'framework/buttons.js',
      js + 'framework/datepicker.js',
      js + 'framework/timepicker.js',
      js + 'framework/characterCounter.js',
      js + 'framework/carousel.js',
      js + 'framework/tapTarget.js',
      js + 'framework/select.js',
      js + 'framework/range.js'
];
const jssrc = [
      js + 'addon/swiper.min.js',
      js + 'addon/iconify.min.js'
];
const jsconfsrc = [
      js + 'config/config.js'
];


function framework() {
  return gulp.src(scss + 'framework.scss', { sourcemaps: true })
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cleancss({compatibility: 'ie8'}))
    .pipe(gulp.dest(cssdist,{ sourcemaps: '.' }));
}
function style() {
  return gulp.src(scss + 'custom/style.scss', { sourcemaps: true })
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cleancss({compatibility: 'ie8'}))
    .pipe(gulp.dest(cssdist,{ sourcemaps: '.' }));
}
function jsframework() {
  return gulp.src(jsframesrc)
    .pipe(concat('framework.js'))
    .pipe(minify())
    .pipe(gulp.dest(jsdist));
}
function addons() {
  return gulp.src(jssrc)
    .pipe(concat('addon.js'))
    .pipe(minify())
    .pipe(gulp.dest(jsdist));
}
function config() {
  return gulp.src(jsconfsrc)
    .pipe(concat('config.js'))
    .pipe(minify())
    .pipe(gulp.dest(jsdist));
}
function imgmi() {
  return gulp.src(imgmin)
  .pipe(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [
          {
              removeViewBox: true
          }
      ]
    }))
    .pipe(gulp.dest(imgmindist));
}
function watch() {
    browserSync.init({
      server: {
            baseDir: "./"
      }
    });
    gulp.watch(styleWatchFiles, framework);
    gulp.watch(styleWatchFiles, style);
    gulp.watch(jssrc, addons);
    gulp.watch(jsconfsrc, config);
    gulp.watch(imgmin, imgmi);
    gulp.watch([jsWatchFiles, htmlWatchFiles, jsdist + 'addon.js',jsdist + 'config.js', cssdist + '*.css']).on('change', reload);
}

exports.framework   = framework;
exports.style       = style;
exports.jsframework = jsframework;
exports.addons      = addons;
exports.config      = config;
exports.imgmi       = imgmi;
exports.watch       = watch;

const build = gulp.series(watch);
gulp.task('default', build);
