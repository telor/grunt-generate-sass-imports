# grunt-generate-sass-imports

> Glob functionality for loading Sass partials based on directory structure

## What is this?
If you use Sass to generate your stylesheets, then you're probably using partials to keep your code modular by separating it into different files. You probably also have different files for global rules, mixins, variables and whatnots. If this is the case, you probably have a main file where you `@import` all the other files. You Also may have a bunch of sass files in subdirectories.

This will parse those directories, and build an import file for the scss files found.

This supports filtering for your very needs.


## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-generate-sass-imports --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-generate-sass-imports');
```

## The "grunt_generate_sass_imports" task

### Overview
In your project's Gruntfile, add a section named `grunt_generate_sass_imports` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
grunt_generate_sass_imports: {
  options: {
    configBase: '/path/to/the/sass/filedir/you/want/to/generate/'
  },
  myTarget: {
    files: [
      {
        expand: true,
        src: ['/path/to/source/files/**/scss/*.scss'],
        dest: '/path/to/the/sass/file/you/want/to/generate/',
        filter: function (file) {
          // Optional Filter
          var pattern = new RegExp(/\/(.+)\/scss\/_?(\1)\.scss/g);
          return pattern.test(file);
        }

      }
    ]
  },

});
```

### Options

#### options.configBase
- Type: `String`
- Default value: `''` (empty string)

Defines the base path to the scss file you want to generate. make this the path without the filename.

```

## Contributing
Feel free to contribute with issues/code/love.

