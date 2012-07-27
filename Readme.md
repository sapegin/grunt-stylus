# Stylus task for Grunt

## Overview

Inside your `grunt.js` file add a section named `stylus`. This section specifies the files to compile and the options passed to [Stylus](http://learnboost.github.com/stylus/).

### Parameters

#### files ```object```

This defines what files this task will process and should contain key:value pairs.

The key (destination) should be an unique filepath (supports [grunt.template](https://github.com/cowboy/grunt/blob/master/docs/api_template.md)) and the value (source) should be a filepath or an array of filepaths (supports [minimatch](https://github.com/isaacs/minimatch)).

Note: When the value contains an array of multiple filepaths, the contents are concatenated in the order passed.

#### options ```object```

This controls how this task (and its helpers) operate and should contain key:value pairs, see options below.

### Options

#### compress ```boolean```

This specifies if we should compress the compiled css.

#### paths ```string|array```

This specifies directories to scan for @import directives when parsing.

### Config Example

``` javascript
stylus: {
  compile: {
    options: {
      'compress': true,
      'include css': true,
      'paths': ['path/to/import', 'another/to/import']
    },
    files: {
      'path/to/result.css': 'path/to/source.styl',
      'path/to/another.css': ['path/to/sources/*.styl', 'path/to/more/*.style'],
    }
  }
},
```

### Using Stylus’s `url()` Function

You can use `url()` function for embedding images as data:uri. You can define any name for it.

```javascript
...
options: {
  urlfunc: "embedurl"
}
...
```

Now you can write in Stylus files:

```css
E {
  background:embedurl('logo.png');
}
```


---

Based on grunt-contrib’s [stylus task](https://github.com/gruntjs/grunt-contrib/blob/master/tasks/stylus.js) by [Eric Woroshow](/errcw), modified by [Artem Sapegin](/sapegin).

## License

The MIT License, see the included `License.md` file.
