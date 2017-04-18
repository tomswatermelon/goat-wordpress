var gulp = require('gulp');
gulp.task('default', function(){

    console.log('default gulp task...')

});

var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var plumberErrorHandler = { errorHandler: notify.onError({
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


gulp.task('sass', function () {
    gulp.src('css/src/*.scss')
        .pipe(plumber(plumberErrorHandler))
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(livereload());

    gulp.src('css/src/vendors/*.css')
        .pipe(concatCss('vendors.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('css'));

});


gulp.task('js', function () {

    gulp.src('js/vendors/*.js')
    .pipe(concat('vendors.js'))
    .pipe(uglify())
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
    gulp.watch('css/src/*.scss', ['sass']);
    gulp.watch('img/src/*.{png,jpg,gif,svg,ico}', ['img']);
});



gulp.task('default', ['sass','js','img','watch']);
