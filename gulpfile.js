const { src, dest, series, parallel, watch } = require('gulp');
const del = require('delete');
const ts = require('gulp-typescript');
const replace = require('gulp-replace');

function clean(cb) {
  del(['dist/**/*', '!dist/content-script.js'], cb);
}

function copy() {
  return src(['src/**', '!**/*.ts', 'vendor/**', 'icons/icon*.png'])
    .pipe(dest('dist'));
}

function removeExportKeyword() {
  return src('src/TableManipulator.ts')
    .pipe(replace('export class TableManipulator {', 'class TableManipulator {'))
    .pipe(dest('src/'));
}

function addExportKeyword() {
  return src('src/TableManipulator.ts')
    .pipe(replace('class TableManipulator {', 'export class TableManipulator {'))
    .pipe(dest('src/'));
}

function transpile() {
  return src('src/content-script.ts')
    .pipe(ts({
        noImplicitAny: true,
        target: 'es6',
        outFile: 'content-script.js'
    }))
    .pipe(dest('dist'));
}

exports.build = series(clean, copy);

exports.transpile = series(removeExportKeyword, transpile, addExportKeyword);

exports.build_full = series(
  clean, 
  parallel(
    copy, 
    exports.transpile
  )
);

exports.watch = function() { watch(['src/**', '!**/*.ts'], exports.build); };

exports.default = exports.build;
