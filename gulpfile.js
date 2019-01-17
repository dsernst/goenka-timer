var gulp = require('gulp')
var webserver = require('gulp-webserver')
var less = require('gulp-less')
var inject = require('gulp-inject')
var runsequence = require('gulp-run-sequence')
var gutil = require('gulp-util')
var source = require('vinyl-source-stream')
var browserify = require('browserify')
var reactify = require('reactify')
var del = require('del')
var path = require('path')
var submarine = require('mac-sounds').bind(null, 'submarine')
var glass = require('mac-sounds').bind(null, 'glass')

// Directories we will provide to `gulp.src`.
var paths = {
  less: ['src/**/*.less', 'src/**/**/*.less', '!src/{style,style/**}'],
  css: ['build/**/*.css', '!build/{style,style/**}'],
  globalcss: ['build/style/*.css'],
  style: ['src/style/*.less'],
  appjs: ['./src/app.jsx'],
  js: ['src/**/*.js', 'src/**/*.jsx'],
  indexhtml: ['./src/index.html'],
  assets: ['./src/assets/**'],
}

// Where we send all our files to.
var destPath = './build'

// Handles an error event.
function swallowError(error) {
  glass()
  gutil.log(error.message)
  this.emit('end')
}

// Deletes the `build` folder.
gulp.task('clean', function (done) {
  del(['build'], done)
})

// Compiles all LESS style sheets that are "local" to specific modules.
gulp.task('less', function () {
  return gulp.src(paths.less)
    .pipe(less({
      paths: [ path.join(__dirname, 'src') ],
    }))
    .on('error', swallowError)
    .pipe(gulp.dest(destPath))
})

// Compiles the global styles (all written in LESS).
gulp.task('style', function () {
  return gulp.src(paths.style)
    .pipe(less({
      paths: [ path.join(__dirname, 'src', 'style') ],
    }))
    .on('error', swallowError)
    .pipe(gulp.dest(path.join(destPath, 'style')))
    .on('end', submarine)
})

// Bundles the scripts, using Browserify.
gulp.task('js', function () {
  return browserify(paths.appjs)
    .transform(reactify)
    .bundle()
    .on('error', function (err) {
      glass()
      gutil.log(err.message)
      this.emit('end')
    })
    .pipe(source('bundle.js'))
    .on('error', swallowError)
    .pipe(gulp.dest(destPath))
    .on('end', submarine)
})

// Copies the index.html from the source directory to the build directory.
gulp.task('copy-index', function () {
  return gulp
    .src(paths.indexhtml)
    .pipe(gulp.dest(destPath))
})

// Injects the "global" styles.
gulp.task('inject-index', function () {
  return gulp
    .src([ path.join(destPath, 'index.html') ])
    .pipe(
      inject(
        gulp.src(paths.globalcss, {read: false}),
        {name: 'global', relative: true}
      )
    )
    .pipe(
      inject(gulp.src(paths.css, {read: false}), {relative: true})
    )
    .pipe(gulp.dest(destPath))
})

// Copies the index.html from the source directory to the build directory, and
// injects link tags into the HTML.
gulp.task('index', function (done) {
  return runsequence('copy-index', 'inject-index', done)
})

gulp.task('copy-assets', function () {
  gulp.src(paths.assets)
    .pipe(gulp.dest(destPath))
})

// Compiles the global styles, local styles, and the JavaSript/JSX code, and
// puts the compiled code into the `build` folder. Injects the necessary
// dependencies into the HTML.
gulp.task('build', function (done) {
  return runsequence(
    'clean',
    ['style', 'less', 'js'],
    'index',
    'copy-assets',
    done
  )
})

// Compiles the local LESS styles and updates the index.
gulp.task('less-and-index', function (done) {
  return runsequence('less', 'index', done)
})

// Compiles the global LESS styles and updates the index.
gulp.task('style-and-index', function (done) {
  return runsequence('style', 'index', done)
})

// Watch for changes in files.
gulp.task('watch', function () {
  gulp.watch(paths.style, ['style-and-index'])
  gulp.watch(paths.less, ['less-and-index'])
  gulp.watch(paths.js.concat(paths.appjs), ['js'])
  gulp.watch(paths.indexhtml, ['index'])
})

// Serve build over localhost:8000.
gulp.task('server', function () {
  return gulp.src(destPath)
    .pipe(webserver({
      livereload: true,
      open: true,
    }))
})

// The default for development: `npm start` calls this.
// Watches for changes, runs the builds, and fires up a web server. Also opens a new browser tab to the application.
gulp.task('develop', function () {
  return runsequence('build', ['watch', 'server'])
})

// An alias to the `build` task.
gulp.task('default', ['build'])
