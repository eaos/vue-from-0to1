//引入gulp和gulp插件
var gulp = require('gulp');
var runSequence = require('run-sequence');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
// var debug = require('gulp-debug');
// var gutil = require('gulp-util');
// var uglify  = require("gulp-uglify");
// var minifyCss = require('gulp-minify-css');
// var revFormat = require('gulp-rev-format');
// var revReplace = require('gulp-rev-replace');
// var replace = require('gulp-replace');

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
    return gulp.src(['assets/css/*.css'])
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});


//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
    return gulp.src(['assets/js/*.js','assets/js/lib/angular.deps.min.js'])
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});

//html模版生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revHtmlTpl', function(){
    return gulp.src(['clinic/**/*.html',"survey/**/*.html"])
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/html'));
});


//Html替换css、js文件版本
gulp.task('revHtml', function () {
    return gulp.src(['rev/**/*.json', 'clinic/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('clinic'));
});

//替换app.js下面的html模版版本号
gulp.task('revJsHtml', function () {
    return gulp.src(['rev/html/rev-manifest.json','assets/js/app.js'])
        .pipe(revCollector())
        .pipe(gulp.dest('assets/js'));
});


//开发构建
gulp.task('dev', function (done) {
    condition = false;
    runSequence(
        ['revCss'],
        ['revJs'],
        ['revHtmlTpl'],
        ['revHtml'],
        ['revJsHtml'],
        done);
});

gulp.task('default', ['dev']);