//引入gulp和gulp插件
var gulp = require('gulp');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var replace = require('gulp-replace');

//压缩css
gulp.task('minifyCss', function() {
    return gulp.src('output/static/app.css')    //需要操作的文件
        //.pipe(concat('app.main.css'))
        //.pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(replace('static/', ''))
        .pipe(minifyCss())   //执行压缩
        .pipe(gulp.dest('output/static'))//输出到文件夹
});

//开发构建
gulp.task('dev', function (done) {
    condition = false;
    runSequence(
        ['minifyCss'],
        done);
});
gulp.task('default', ['dev']);