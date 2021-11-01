const gulp = require('gulp'),  // подключаем Gulp
    webserver = require('browser-sync'), // сервер для работы и автоматического обновления страниц
    rigger = require('gulp-rigger'), // модуль для импорта содержимого одного файла в другой
    sass = require('gulp-sass'), // модуль для компиляции SASS (SCSS) в CSS
    autoprefixer = require('gulp-autoprefixer'), // модуль для автоматической установки автопрефиксов
    cleanCSS = require('gulp-clean-css'), // плагин для минимизации CSS
    uglify = require('gulp-uglify'), // модуль для минимизации JavaScript
    imagemin = require('gulp-imagemin'), // плагин для сжатия PNG, JPEG, GIF и SVG изображений
    del = require('del'), // плагин для удаления файлов и каталогов
    minifyjs = require('gulp-js-minify'),
    concat = require('gulp-concat');



// ****** PATHS ****** //


var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/style/**/*.scss',
        img: 'src/img/**/*.*'
    },
    clean: './build/*'
};

var config = {
    server: {
        baseDir: './build'
    },
    notify: false
};




//  ****** TASKS ****** //


gulp.task('webserver', function () {
    webserver(config);
});


// *** HTML *** //

gulp.task('html:build', function () {
    return gulp.src(path.src.html) 
        .pipe(rigger()) 
        .pipe(gulp.dest(path.build.html)) 
        .pipe(webserver.reload({ stream: true })); 
});


// *** CSS *** //

gulp.task('css:build', function () {
    return gulp.src(path.src.style) 
        .pipe(sass().on('error', sass.logError) ) 
        .pipe(autoprefixer()) 
        .pipe(cleanCSS()) 
        .pipe(gulp.dest(path.build.css))
        .pipe(webserver.reload({ stream: true })); 
});


// *** JS *** //

gulp.task('js:build', function () {
    return gulp.src(path.src.js)
        .pipe(uglify()) 
        .pipe(concat('script.js'))
        .pipe(minifyjs())
        .pipe(gulp.dest(path.build.js))
        .pipe(webserver.reload({ stream: true })); 
});


// *** IMG *** //

gulp.task('image:build', function () {
    return gulp.src(path.src.img) 
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.img)); 
});


// *** CLEAN *** //

gulp.task('clean:build', function () {
    return del(path.clean);
});


// *** EVERYTHING *** //

gulp.task('build',
    gulp.series('clean:build',
        gulp.parallel(
            'html:build',
            'css:build',
            'js:build',
            'image:build'
        )
    )
);


// **** WATCHER **** //

gulp.task('watch', function () {
    gulp.watch(path.watch.html, gulp.series('html:build'));
    gulp.watch(path.watch.css, gulp.series('css:build'));
    gulp.watch(path.watch.js, gulp.series('js:build'));
    gulp.watch(path.watch.img, gulp.series('image:build'));
});



// *********** MAIN TASKS *********** //


// gulp build

gulp.task('build', gulp.series('build'))


// gulp dev

gulp.task('dev', gulp.series(
    'build',
    gulp.parallel('webserver','watch')      
));

