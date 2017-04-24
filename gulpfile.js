var gulp = require('gulp');
var {restore, build, test, pack, publish} = require('gulp-dotnet-cli');

var run = require('gulp-run');

gulp.task('dockerbuild',["dotnetbuild"], ()=>{
    return gulp.src('src/WebApplicationBasic.fsproj', {read: false})
                .pipe(publish());
})

gulp.task('dotnetbuild',["dotnetrestore"], ()=>{
    return gulp.src('src/WebApplicationBasic.fsproj', {read: false})
                .pipe(restore());
})

gulp.task('dotnetrestore', ()=>{
    return gulp.src('src/WebApplicationBasic.fsproj', {read: false})
                .pipe(restore());
})

gulp.task('docker:compose', ()=>{
    return run('docker-compose build').exec()    // prints "Hello World\n". 
    .pipe(gulp.dest('output')) ;     // writes "Hello World\n" to output/echo. 
  
    
} )

gulp.task('docker:start', ()=>{
    return run('docker run -t -P -d aspnetcore_fsharp_docker').exec()    // prints "Hello World\n". 
    .pipe(gulp.dest('output')) ;     // writes "Hello World\n" to output/echo. 
  
    
} )