//引入gulp和gulp插件
var gulp = require('gulp');
var runSequence = require('run-sequence');
//var concat = require('gulp-concat');
//var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var replace = require('gulp-replace');

//压缩css
gulp.task('minifyCss', function() {
    return gulp.src('output/static/app.css')   //需要操作的文件
        //.pipe(concat('app.main.css'))         //合并文件，这里暂时不需要
        //.pipe(rename({suffix: '.min'}))       //rename压缩后的文件名
        .pipe(replace('static/', ''))           //替换字符串,生成的路径有问题，多了一个'static/',这里替换成空
        .pipe(minifyCss())                      //执行压缩
        .pipe(gulp.dest('output/static'))       //输出到文件夹,不能具体到文件名不然会提示已存在
});

gulp.task('autoprefixer', function () {
    var postcss    = require('gulp-postcss');
    var sourcemaps = require('gulp-sourcemaps');

    return gulp.src('output/static/app.css')
        //.pipe( sourcemaps.init() )
        .pipe( postcss([ require('precss'), require('autoprefixer') ]) )
        //.pipe( sourcemaps.write('.') )
        .pipe( gulp.dest('output/static') );
});

//开发构建
gulp.task('dev', function (done) {
    condition = false;
    runSequence(
        ['minifyCss'],
        ['autoprefixer'],
        done);
});
gulp.task('default', ['dev']);