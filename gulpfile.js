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
                .pipe(build());
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
    
    var p = new Promise((good, bad)=>{
        docker.listContainers(function (err, containers) {
            
            var promises = [];

            for(var i in containers){
                var containerInfo = containers[i];
                promises.push(new Promise((dockerGood, dockerBad)=>{
                       docker.getContainer(containerInfo.Id).stop(dockerGood);
                       console.log("Stopped container: " +containerInfo.Id);
                }));           
            
            }
            Promise.all(promises).then(good);             
        });  
    });
  
    p.then(()=>{
        cb();
    });
    
});