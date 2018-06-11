//1.引入
var gulp = require('gulp');
var sass = require('gulp-sass');
var minCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer')

//开始布置任务 编译css 压缩css 输出目标文件
gulp.task('css', function() {
    //开始的路径
    gulp.src('src/css/*.scss')
        //把scss文件编译成css文件
        .pipe(sass())
        //加上前缀
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        //压缩css文件
        .pipe(minCss())
        //输出到目标文件夹
        .pipe(gulp.dest('build/css'))
})

//开始任务 压缩js
gulp.task('uglify', function() {
    //开始的路径
    gulp.src('src/js/*.js')
        //压缩js
        .pipe(uglify())
        //输出目标文件夹
        .pipe(gulp.dest('build/js'))
})


gulp.task('watch', function() {
    //监听
    gulp.watch('src/scc/*.scss', ['css'])
    gulp.watch('src/js/*.js', ['uglify'])
})

//启服务
gulp.task('server', ['css', 'uglify', 'watch'], function() {
        //运行的文件夹
        gulp.src('build')
            .pipe(server({
                //端口
                port: 8068,
                //自动打开
                open: true,
                //自动刷新浏览器
                livereload: true,
                middleware: function(req, res, next) {

                    next()
                }
            }))
    })
    //任务
gulp.task('default', ['server'])