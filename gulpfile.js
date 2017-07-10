const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const jshint = require('gulp-jshint');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const merge = require('merge-stream');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
const notify = require('gulp-notify');
const clean = require('del');


const config = {
    source: './src/',
    dist: './public/',
};

const paths = {
    assets: 'assets/',
    html: '**/*.html',
    sass: 'scss/**/*.scss',
    mainScss: 'scss/*.scss',
    mainJs: 'js/',
    libs: 'libs/',
    img: 'img/'
};

const sources = {
    assets:config.source + paths.assets,
    html:config.source + paths.html,
    scss:paths.assets + paths.sass,
    rootScss:config.source + paths.assets + paths.mainScss,
    rootJs: config.source + paths.assets + paths.mainJs,
    rootImg: config.source + paths.assets + paths.img
};

gulp.task("css", ()=>{
    gulp.src(sources.rootScss)
        .pipe(rename({suffix: '.min', extname: '.css'}))
        .pipe(sass({
        outputStyle: 'compressed',
        includePaths: sources.assets + paths.libs + 'bootstrap-sass/assets/stylesheets'
    }).on("error", sass.logError))
        .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
        .pipe(gulp.dest(config.dist + paths.assets +"css"))
        .pipe(browserSync.stream())
        .pipe(notify('gulp css terminada'));
});

gulp.task('js', ()=>{
    return gulp.src([sources.assets + paths.libs + 'jquery/dist/jquery.js',
                     sources.assets + paths.libs + 'bootstrap-sass/assets/javascripts/bootstrap.js',
                     sources.rootJs + '*/functions.js',
                     sources.rootJs + '*/filter-by-theme.js',
                     sources.rootJs + '*/create-topic-modal.js',
                     sources.rootJs + '*/all-topic.js',
                     sources.rootJs + '*/show-responses.js',
                     sources.rootJs+'main.js'])
        /*.pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify({message: 'JSHints task complete'}))    */
        .pipe(babel({presets: 'es2015'}))
        .pipe(concat('bundle.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(config.dist + paths.assets + paths.mainJs))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('html',()=>{
    return gulp.src(sources.html).pipe(gulp.dest(config.dist)).pipe(notify({ message: 'html task complete' }));
});

gulp.task("img", ()=>{
    return gulp.src(sources.rootImg + '**/*.png').pipe(gulp.dest(config.dist + paths.assets + 'img')).pipe(notify({ message: 'img task complete' }));
});

gulp.task('clean', (cb)=>{
    return clean([config.dist + paths.assets +"css", config.dist + paths.assets + paths.mainJs, config.dist+'/*.html'], cb)
});

gulp.task('default', ['clean'], ()=>{
    return gulp.start('css', 'js', 'html')
        .pipe(notify({ message: 'default task complete' }));
});

gulp.task("css-watch",["css"], (done)=>{
    browserSync.reload();
    done();
});

gulp.task("js-watch",["js"], (done)=>{
    browserSync.reload();
    done();
});

gulp.task("html-watch",["html"], (done)=>{
    browserSync.reload();
    done();
});

gulp.task('nodemon', (cb)=>{
    const started = false;
    return nodemon({
        script: 'server.js'
    }).on('start', ()=>{
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task("serve", ['nodemon'], ()=>{
    browserSync.init(null, {
        proxy: "http://localhost:5000",
        files: ["public/**/*.*"],
        port: 7000,
    });
    gulp.watch(sources.html,['html-watch']);
    gulp.watch("./src/assets/scss/*.scss",['css-watch']);
    gulp.watch("./src/assets/js/*.js",['js-watch']);
});
