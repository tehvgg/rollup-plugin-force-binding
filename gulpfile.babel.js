import gulp from 'gulp';
import rollup from 'rollup-stream';
import babel from 'rollup-plugin-babel';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

const entry = 'src/index.js';
const filename = 'index.cjs.js';
const dest = 'dist/';

gulp.task('build', function () {
  return rollup({ format: 'cjs', entry, plugins: [ babel() ] })
    .pipe(source(filename))
    .pipe(buffer())
    .pipe(gulp.dest(dest));
});
