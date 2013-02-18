# Stylus task for Grunt

## Warning

This plugin is deprecated. Use [grunt-contrib-stylus](https://github.com/gruntjs/grunt-contrib-stylus) with Grunt 0.4. It’s more awesome and it should work fine as a drop-in replacement for grunt-stylus.


## Installation

Install `grunt-stylus`:

```
npm install grunt-stylus
```

Add somewhere in your `grunt.js`:

```javascript
grunt.loadNpmTasks('grunt-stylus');
```

Inside your `grunt.js` file add a section named `stylus`. See Parameters section below for details.


## Parameters

### files ```object```

Defines what files this task will process and should contain key:value pairs. The key should result CSS files and the value should be a source Stylus filepath. Supports [grunt.template](https://github.com/cowboy/grunt/blob/master/docs/api_template.md).

### options ```object```

Controls how this task (and its helpers) operate and should contain key:value pairs, see Options section below.

## Options

### paths ```string|array```

Specifies directories to scan for @import directives when parsing.

### Notes

* You can specify all other Stylus options you need: eg. `include css`.

* Options `compress` is enabled by default. See section Handling of `--debug` option below for details.


## Config Example

``` javascript
stylus: {
  compile: {
    options: {
      'include css': true,
      'paths': ['path/to/import', 'another/to/import']
    },
    files: {
      'path/to/result.css': 'path/to/source.styl',
      'path/to/another.css': 'path/to/source2.styl'
    }
  }
},
```


## Nib Support

Nib is supported by default. You don’t need to do anything. Just `@import 'nib';` anywere you need some `nib`.


## Using Stylus’s `url()` Function

You can use `url()` function for embedding images as data:uri. You can define any name for it.

```javascript
...
options: {
  urlfunc: 'embedurl'
}
...
```

Now you can write in Stylus files:

```css
E {
  background:embedurl("logo.png");
}
```


## Handling of `--debug` option

Compression (`compress` option in Stylus) disables when `--debug` options for `grunt` is specified. And enables otherwise.


---

## License

The MIT License, see the included `License.md` file.
