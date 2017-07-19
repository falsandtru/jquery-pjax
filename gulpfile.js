const gulp = require('gulp');
const glob = require('glob');
const shell = cmd => require('child_process').execSync(cmd, { stdio: [0, 1, 2] });
const del = require('del');
const extend = require('extend');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const $ = require('gulp-load-plugins')();
const seq = require('run-sequence');
const browserify = require('browserify');
const tsify = require('tsify');
const pump = require('pump');
const Server = require('karma').Server;

const pkg = require('./package.json');
const config = {
  browsers: ['Chrome', 'Firefox'].concat((os => {
    switch (os) {
      case 'Windows_NT':
        return ['Edge'];
      case 'Darwin':
        return [];
     default:
        return [];
    }
  })(require('os').type())),
  ts: {
    dist: {
      src: [
        '*.ts'
      ],
      dest: 'dist'
    },
    test: {
      src: [
        '*.ts',
        'src/**/*.ts',
        'test/**/*.ts'
      ],
      dest: 'dist'
    }
  },
  banner: [
    `/*! ${pkg.name} v${pkg.version} ${pkg.repository.url} | (c) 2016, ${pkg.author} | ${pkg.license} License */`,
    ''
  ].join('\n'),
  clean: {
    dist: 'dist'
  }
};

function compile(paths, force) {
  let done = true;
    return browserify(Object.values(paths).map(p => glob.sync(p)))
    .require(`./index.ts`, { expose: pkg.name })
    .plugin(tsify, Object.assign({ global: true }, require('./tsconfig.json').compilerOptions))
    .bundle()
    .on("error", err => done = console.log(err + ''))
    .pipe(source(`${pkg.name}.js`))
    .pipe(buffer())
    .once("finish", () => done || force || process.exit(1));
}

gulp.task('ts:watch', function () {
  gulp.watch(config.ts.test.src, () => {
    return compile(config.ts.test.src, true)
      .pipe(gulp.dest(config.ts.test.dest));
  });
});

gulp.task('ts:test', function () {
  return compile(config.ts.test.src)
    .pipe(gulp.dest(config.ts.test.dest));
});

gulp.task('ts:dist', function (done) {
  pump([
    compile(config.ts.dist.src),
    $.unassert(),
    $.header(config.banner),
    gulp.dest(config.ts.dist.dest),
    $.rename({ extname: '.min.js' }),
    $.uglify({ output: { comments: 'all' } }),
    gulp.dest(config.ts.dist.dest)
  ], done);
});

gulp.task('karma:watch', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    browsers: config.browsers,
    preprocessors: {
      'dist/*.js': ['espower']
    },
  }, done).start();
});

gulp.task('karma:test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    browsers: config.browsers,
    reporters: ['dots', 'coverage'],
    preprocessors: {
      'dist/*.js': ['coverage', 'espower']
    },
    singleRun: true
  }, done).start();
});

gulp.task('karma:ci', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    browsers: config.browsers,
    reporters: ['dots', 'coverage', 'coveralls'],
    preprocessors: {
      'dist/*.js': ['coverage', 'espower']
    },
    singleRun: true
  }, done).start();
});

gulp.task('clean', function () {
  return del([config.clean.dist]);
});

gulp.task('install', function () {
  shell('npm i --no-shrinkwrap');
});

gulp.task('update', function () {
  shell('bundle update');
  shell('ncu -ua');
  shell('npm i -DE typescript@next --no-shrinkwrap');
  shell('npm i --no-shrinkwrap');
});

gulp.task('watch', ['clean'], function () {
  seq(
    'ts:test',
    [
      'ts:watch',
      'karma:watch'
    ]
  );
});

gulp.task('test', ['clean'], function (done) {
  seq(
    'ts:test',
    'karma:test',
    'ts:dist',
    function () {
      done();
    }
  );
});

gulp.task('view', ['site'], function () {
  shell('bundle exec jekyll serve -s ./gh-pages -d ./gh-pages/_site --incremental');
});

gulp.task('dist', ['clean'], function (done) {
  seq(
    'ts:dist',
    done
  );
});

gulp.task('site', ['dist'], function () {
  return gulp.src([
    'dist/pjax-api.js'
  ])
    .pipe(gulp.dest('./gh-pages/assets/js/lib'));
});

gulp.task('ci', ['clean'], function (done) {
  seq(
    'ts:test',
    'karma:ci',
    'dist',
    'site',
    function () {
      done();
    }
  );
});
