/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
//
// es6-module-playground
// by Eason Kang - Autodesk Developer Network (ADN)
//
/////////////////////////////////////////////////////////////////////

const gulp = require( 'gulp' );
const browsersync = require( 'browser-sync' ).create();
const webpack = require( 'webpack' );
const gulpWebpack = require( 'webpack-stream' );
const sourcemaps = require( 'gulp-sourcemaps' );
const cleanCSS = require( 'gulp-clean-css' );
const concat = require( 'gulp-concat' );
const pkg = require( './package.json' );

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './test/'
    },
    port: 3000
  });
  done();
}

// JavaScript
function script() {
  return gulp.src( 'src/js/index.js' )
    .pipe(
      gulpWebpack(
        {
          devtool: 'source-map',
          output: {
            filename: `${ pkg.name }.js`,
            libraryTarget: 'umd',
            library: 'ADN'
          },
          resolve: {
            extensions: [ '.js' ],
          },
          module: {
            loaders: [
              {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                  presets: ['env'],
                  plugins: [
                    'transform-class-properties'
                  ]
                }
              }
            ]
          },
          externals: {
            'jquery': 'jQuery',             //!<<< Mark jquery as external packages
            'three': 'THREE',               //!<<< Mark three.js as external packages
            'forge-viewer': 'Autodesk'      //!<<< Mark forge-viewer as external packages, i.e. Webpack won't seek for it from node_modules folder while compiling.
          },
          plugins: [
            new webpack.ProvidePlugin({
              'window.jQuery': 'jquery',
              'jQuery': 'jquery',
              $: 'jquery',
              'THREE': 'three',             //!<<< Resolve three.js libraries from window.THREE variable
              'Autodesk': 'forge-viewer'    //!<<< Resolve Forge Viewer libraries from window.Autodesk variable
            })
          ]
        },
        webpack
      )
    )
    .pipe( gulp.dest( 'test/dist' ) )
    .pipe( browsersync.stream() );
}

// function script4App() {
//   return gulp.src( 'src/app.js' )
//     .pipe(
//       gulpWebpack(
//         {
//           devtool: 'source-map',
//           output: {
//             filename: `${ pkg.name }-app.js`,
//             libraryTarget: 'umd',
//             library: 'ADN'
//           },
//           resolve: {
//             extensions: [ '.js' ],
//           },
//           module: {
//             loaders: [
//               {
//                 test: /\.js$/,
//                 loader: 'babel-loader',
//                 query: {
//                   presets: ['env'],
//                   plugins: [
//                     'transform-class-properties'
//                   ]
//                 }
//               }
//             ]
//           },
//           externals: {
//             'jquery': 'jQuery',             //!<<< Mark jquery as external packages
//             'three': 'THREE',               //!<<< Mark three.js as external packages
//             'forge-viewer': 'Autodesk'      //!<<< Mark forge-viewer as external packages, i.e. Webpack won't seek for it from node_modules folder while compiling.
//           },
//           plugins: [
//             new webpack.ProvidePlugin({
//               'window.jQuery': 'jquery',
//               'jQuery': 'jquery',
//               $: 'jquery',
//               'THREE': 'three',             //!<<< Resolve three.js libraries from window.THREE variable
//               'Autodesk': 'forge-viewer'    //!<<< Resolve Forge Viewer libraries from window.Autodesk variable
//             })
//           ]
//         },
//         webpack
//       )
//     )
//     .pipe( gulp.dest( 'test/dist' ) )
//     .pipe( browsersync.stream() );
// }

// CSS
function style() {
  return gulp.src( 'src/css/index.css' )
    .pipe( sourcemaps.init( { loadMaps: true } ) )
    .pipe( concat( `${ pkg.name }.css` ) )
    .pipe( cleanCSS() )
    .pipe( sourcemaps.write( '.', {
      sourceRoot: 'src/css'
    }))
    .pipe(gulp.dest('test/dist'))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch( 'src/css/**/*.css', style );
  gulp.watch( 'src/js/**/*.js', script );
}

const styles = gulp.parallel( style );
const scripts = gulp.series( script );
const watch = gulp.parallel( watchFiles, browserSync );
const build = gulp.parallel( styles, scripts );

exports.scripts = scripts;
exports.styles = styles;
exports.watch = watch;
exports.build = build;
exports.default = gulp.series(exports.scripts, styles, watch );