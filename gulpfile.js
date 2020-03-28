var fs = require( 'fs' );
var gulp = require( 'gulp' );
var watch =  require( 'gulp-watch' );
var ghpages = require( 'gh-pages' );

const pckg = JSON.parse( fs.readFileSync( './package.json' ) );

function getVersion() {
	const json = JSON.parse( fs.readFileSync( './package.json' ) );
	return json.version;
}

var master = {};
master.base = './_dist/master/';

var showcase = {};
showcase.base = './_dist/gh-pages/';

gulp.task( 'copy-required', function() {

	gulp.src([
			'./node_modules/jquery/dist/jquery.min.js',
			'./node_modules/jquery-slotmachine/dist/slotmachine.min.js',
			'./node_modules/jquery-slotmachine/dist/jquery.slotmachine.min.js'
		])
		.pipe( gulp.dest( './assets/js/' ) );

	gulp.src([
			'./node_modules/jquery-slotmachine/dist/jquery.slotmachine.min.css'
		])
		.pipe( gulp.dest( './assets/css/' ) );
});

gulp.task( 'prepare-files', function() {

	// Copy html files.
	gulp.src( '*.html' )
		.pipe( gulp.dest( master.base ) )
		.pipe( gulp.dest( showcase.base ) );

	// Copy JS only.
	gulp.src( './assets/js/*.js' )
		.pipe( gulp.dest( master.base + 'assets/js/' ) )
		.pipe( gulp.dest( showcase.base + 'assets/js/' ) );

	// Copy CSS only.
	gulp.src( './assets/css/*.css' )
		.pipe( gulp.dest( master.base + 'assets/css/' ) )
		.pipe( gulp.dest( showcase.base + 'assets/css/' ) );

	// Copy images.
	gulp.src( './assets/images/*' )
		.pipe( gulp.dest( master.base + 'assets/images/' ) )
		.pipe( gulp.dest( showcase.base + 'assets/images/' ) );

	// Copy gitignore.
	gulp.src( '.gitignore' )
		.pipe( gulp.dest( master.base ) )
		.pipe( gulp.dest( showcase.base ) );

	// Copy extra files.
	gulp.src([
		'./gulpfile.js',
		'./package.json',
		'./package-lock.json',
		'./LICENSE',
		'./*.md',
		])
		.pipe( gulp.dest( master.base ) );
});

/**
 * Publishing tasks.
 * Release master and showcase files to
 * its correct branches.
 */

// Release development.
gulp.task( 'publish:master', () => {

	ghpages.publish( '_dist/master/', {
		branch: 'master',
		repo: 'https://github.com/iamleigh/wpmudev-jackpot.git',
		dest: '',
		dotfiles: true,
		message: ':package: WPMU DEV Jackpot v' + getVersion()
	});
});

// Release gh-pages.
gulp.task( 'publish:showcase', () => {

	ghpages.publish( '_dist/gh-pages/', {
		branch: 'gh-pages',
		repo: 'https://github.com/iamleigh/wpmudev-jackpot.git',
		dest: '',
		dotfiles: true,
		message: ':package: WPMU DEV Jackpot v' + getVersion()
	});
});
