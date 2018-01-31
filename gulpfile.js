var gulp = require('gulp');
gulp.task('default', function() {

    console.log('default gulp task...')

});

var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var plumberErrorHandler = {
    errorHandler: notify.onError({
        title: 'Gulp',
        message: 'Error: <%= error.message %>'
    })
};
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var order = require("gulp-order");
var autoprefixer = require("gulp-autoprefixer");


gulp.task('sass', function() {
    
    gulp.src(['css/src/*.scss','css/src/vendors/*.css'])
        .pipe(sass())
        .pipe(order([
            'css/src/vendors/*.css',
            'css/src/*.scss'
        ],{base:'./'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        // .pipe(cleanCSS())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('css'))
        .pipe(livereload());

});


gulp.task('js', function() {

    gulp.src(['js/src/*.js','js/src/modules/*.js','js/src/vendors/*.js'])
        .pipe(order([
            'js/src/vendors/*.js',
            'js/src/modules/*.js',
            'js/src/*.js'
        ],{base:'./'}))
        .pipe(concat('bundle.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('js'));

});

var imagemin = require('gulp-imagemin');
gulp.task('img', function() {

    gulp.src('img/src/*.{png,jpg,gif,svg,ico}')
        .pipe(imagemin({
            optimizationLevel: 7,
            progressive: true
        }))
        .pipe(gulp.dest('img'))

});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['js/src/*.js','js/vendors/*.js','js/src/modules/*.js'], ['js']);
    gulp.watch(['css/src/*.scss'], ['sass']);
    gulp.watch('css/src/modules/*.scss', ['sass']);
    gulp.watch('css/src/vendors/*.css', ['sass']);
    gulp.watch('css/src/includes/*.scss', ['sass']);
    gulp.watch('img/src/*.{png,jpg,gif,svg,ico}', ['img']);
});



gulp.task('default', ['sass', 'js', 'img', 'watch']);
