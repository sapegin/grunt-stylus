/**
 * Stylus task for Grunt
 *
 * @author Eric Woroshow (https://github.com/errcw)
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
		// @todo Ditch this when grunt v0.4 is released
		this.files = this.files || grunt.helper('normalizeMultiTaskFiles', this.data, this.target);

		var done = this.async();

		async.forEachSeries(this.files, function(file, next) {
			var srcFiles = grunt.file.expandFiles(file.src);

			async.concatSeries(srcFiles, function(srcFile, nextConcat) {
				var helperOptions = _.extend({filename: srcFile}, this.data.options),
					sourceCode = grunt.file.read(srcFile);

				grunt.helper('stylus', sourceCode, helperOptions, function(css) {
					nextConcat(css);
				});
			}, function(css) {
				grunt.file.write(file.dest, css);
				grunt.log.writeln("File '" + file.dest + "' created.");

				next();
			});
		}, function() {
			done();
		});
	});

	grunt.registerHelper('stylus', function(source, options, callback) {
		var stylus = require('stylus'),
			s = stylus(source);

		// Load nib if available
		try {
			s.use(require('nib')());
		}
		catch(e) {

		}

		_.each(options, function(value, key) {
			if (key === 'urlfunc') {
				s.define(value, stylus.url());
			}
			else {
				s.set(key, value);
			}
		});

		s.render(function(err, css) {
			if (err) {
				grunt.log.error(err);
				grunt.fail.warn('Stylus failed to compile.');
			}
			else {
				callback(css);
			}
		});
	});


	// TODO: ditch this when grunt v0.4 is released
	// Temporary helper for normalizing files object
	grunt.registerHelper("normalizeMultiTaskFiles", function(data, target) {
		var prop, obj;
		var files = [];
		if (grunt.util.kindOf(data) === 'object') {
			if ('src' in data || 'dest' in data) {
				obj = {};
				if ('src' in data) { obj.src = data.src; }
				if ('dest' in data) { obj.dest = data.dest; }
				files.push(obj);
			} else if (grunt.util.kindOf(data.files) === 'object') {
				for (prop in data.files) {
					files.push({src: data.files[prop], dest: prop});
				}
			} else if (Array.isArray(data.files)) {
				data.files.forEach(function(obj) {
					var prop;
					if ('src' in obj || 'dest' in obj) {
						files.push(obj);
					} else {
						for (prop in obj) {
							files.push({src: obj[prop], dest: prop});
						}
					}
				});
			}
		} else {
			files.push({src: data, dest: target});
		}
		// Process each normalized file object as a template.
		files.forEach(function(obj) {
			// Process src as a template (recursively, if necessary).
			if ('src' in obj) {
				obj.src = grunt.util.recurse(obj.src, function(src) {
					if (typeof src !== 'string') { return src; }
					return grunt.template.process(src);
				});
			}
			if ('dest' in obj) {
				// Process dest as a template.
				obj.dest = grunt.template.process(obj.dest);
			}
		});

		return files;
	});
};
