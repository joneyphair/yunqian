var path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();




gulp.task('dev:styles',function(){
	gulp.src('src/styles/**.less')
		.pipe($.less())
		.pipe(gulp.dest('build/css'));
});


gulp.task('scripts:components',function(){

});

gulp.task('dev:scripts',['scripts:components'],function(){

});

gulp.task('dev:templates',function(){
	gulp.src('src/templates/**.html')
		.pipe(gulp.dest('build/templates'));
});

gulp.task('dev',['dev:styles','dev:scripts','dev:templates']);


gulp.task('watch', function () {
    gulp.watch('src/templates/**.html', ['dev:templates']);
    gulp.watch('src/styles/**/*.less', ['dev:styles']);
    gulp.watch(['src/scripts/**/*.js'], ['dev:scripts']);
});


// 默认任务
gulp.task('default',['dev','watch']);
