module.exports = function (grunt) {
  grunt.initConfig({
    jsdoc: {
      dist: {
        src: ['api/controllers/**/*.js', 'README.md'],
        options: {
          destination: 'doc',
          template: 'node_modules/ink-docstrap/template',
          configure: 'conf.json',
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.registerTask('default', ['jsdoc']);
};
