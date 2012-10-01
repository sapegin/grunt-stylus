/*jshint node:true*/
module.exports = function(grunt) {
	'use strict';

	// Project configuration
	grunt.initConfig({
		lint: {
			files: [
				'tasks/stylus.js',
				'grunt.js'
			]
		},
		stylus: {
			compile: {
				files: {
					'test/tmp/styles.css': 'test/src/index.styl'
				},
				options: {
					'include css': true,
					'paths': ['test/src/subdir']
				}
			}
		},
		test: {
			tasks: ['test/*_test.js']
		},
		jshint: {
			options: {
				node: true,
				white: false,
				smarttabs: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				undef: true
			}
		}
	});

	grunt.loadTasks('tasks');

	var fs = require('fs');
	grunt.registerTask('clean', 'Remove temporary files.', function() {
		try { fs.unlinkSync('test/tmp/styles.css'); } catch(e) {}
		try { fs.rmdirSync('test/tmp/'); } catch(e) {}
	});

	// Default task
	grunt.registerTask('default', 'lint clean stylus test');

};