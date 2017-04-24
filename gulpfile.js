//sometimes need this on mac. 
//eval "$(docker-machine env default)"

var gulp = require('gulp');
var {restore, build, test, pack, publish} = require('gulp-dotnet-cli');

var run = require('gulp-run');

var Docker = require('dockerode');



gulp.task('dotnet:publish',["dotnet:build", "bower:install"], ()=>{
    return gulp.src('src/WebApplicationBasic.fsproj', {read: false})
                .pipe(publish());
})

gulp.task('dotnet:build',["dotnet:restore"], ()=>{
    return gulp.src('src/WebApplicationBasic.fsproj', {read: false})
                .pipe(restore());
})

gulp.task('dotnet:restore', ()=>{
    return gulp.src('src/WebApplicationBasic.fsproj', {read: false})
                .pipe(restore());
})

gulp.task('bower:install',()=>{
    return run('bower install ./src').exec()   
    .pipe(gulp.dest('output')) ;     
} )

gulp.task('docker:compose',["dotnet:publish"], ()=>{
    return run('docker-compose build').exec()   
    .pipe(gulp.dest('output')) ;     
} )

gulp.task('docker:start',["docker:stop"], ()=>{
    return run('docker run -t -P -d aspnetcore_fsharp_docker').exec() 
    .pipe(gulp.dest('output'));    
});

gulp.task('docker:full',["docker:compose"], ()=>{
    return gulp.start("docker:start");
});

gulp.task('docker:stop', (cb)=>{
    var docker = new Docker();
    
    docker.listContainers(function (err, containers) {
        containers.forEach(function (containerInfo) {
            docker.getContainer(containerInfo.Id).stop(cb);
            console.log("Stopped container: " +containerInfo.Id);
        });        
       
    });  
    
});