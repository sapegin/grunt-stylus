/**
 * Stylus task for Grunt
 *
 * @author Artem Sapegin (http://sapegin.me)
 */

/*jshint node:true */
module.exports = function(grunt) {
	'use strict';

	// @todo Ditch this when grunt v0.4 is released
	grunt.util = grunt.util || grunt.utils;

	var _ = grunt.util._,
		async = grunt.util.async;

	grunt.registerMultiTask('stylus', 'Compile Stylus files into CSS', function() {
		var files = this.data.files,
			options = this.data.options,
			done = this.async(),
			path = require('path');

		async.forEach(Object.keys(files), function(dest, next) {
			var src = files[dest];
			src = grunt.template.process(src);
			dest = grunt.template.process(dest);

			var sourceCode = grunt.file.read(src);
			grunt.helper('stylus', sourceCode, path.dirname(src), options, function(css) {
				grunt.file.write(dest, css);
				grunt.log.writeln("File '" + dest + "' created.");

				next();
			});
		}, function() {
			done();
		});
	});

	grunt.registerHelper('stylus', function(source, rootDir, options, callback) {
		var stylus = require('stylus'),
			s = stylus(source);

		// If --debug was specified
		options.compress = !grunt.option('debug');

		_.each(options, function(value, key) {
			if (key === 'urlfunc') {
				// Custom name of function to embed images as Data URI
				s.define(value, stylus.url());
			}
			else {
				s.set(key, value);
			}
		});

		s.include(rootDir);

		// Load nib if available
		try {
			s.use(require('nib')());
		}
		catch(e) {

		}

		s.render(function(err, css) {
			if (err) {
				err = 'Stylus: ' + err;
				if (grunt.option('debug'))
					grunt.log.error(err);
				else
					grunt.fatal(err);
			}
			callback(css);
		});
	});

};
