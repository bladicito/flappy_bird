module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-uglify');  	// Compress javascript files
	grunt.loadNpmTasks('grunt-contrib-concat');		// Merge JS files
	grunt.loadNpmTasks('grunt-contrib-cssmin'); 	// Compress CSS files
	grunt.loadNpmTasks('grunt-contrib-compass'); 	// Handles SASS files and convert them into CSS
	grunt.loadNpmTasks('grunt-contrib-watch'); 		// check if changes in project are done and perform task if changes are found
	grunt.loadNpmTasks('grunt-contrib-clean');		// deletes created files ???

	grunt.initConfig({

		uglify : {
			options: {
				mangle: false
			},

			my_target: {
				files: {
					'js/base.min.js': ['components/js/mootools-core.js','components/js/main.js', 'components/js/scripts.js']
				}
			}
		},

		cssmin: {
			minify: {
				expand: true,
				cwd: 'components/css/',
				src: ['*.css', '!*.min.css'],
				dest: 'css/',
				ext: '.min.css'
			}
		},

		compass : {
			dev: {
				options : {
					noLineComments : true,
					config : 'config.rb'
				}
			}
		},

		watch : {
			options : {
				livereload : true
			},
			scripts: {
				files: ['components/js/*.js'],
				tasks: ['uglify']
			},
			html: {
				files: ['*.html']
			},
			sass :{
				files : ['components/sass/*.scss'],
				tasks : ['compass:dev']
			},
			cssmin : {
				files : ['components/css/styles.css'],
				tasks : ['cssmin:minify']
			}
		}
	});

	grunt.registerTask('default','watch');
}