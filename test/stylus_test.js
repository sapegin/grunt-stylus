var fs = require('fs');

exports.stylus = {
	compile: function(test) {
		'use strict';

		test.expect(1);

		var actual = fs.readFileSync('test/tmp/styles.css', 'utf8');
		var expected = fs.readFileSync('test/expected/styles.css', 'utf8');
		test.equal(expected, actual, 'Should compile Stylus to CSS.');

		test.done();
	}
};