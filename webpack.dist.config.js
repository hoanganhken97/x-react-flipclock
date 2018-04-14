const webpack = require('webpack')

const path = require('path')
const autoprefixer = require('autoprefixer')

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = function(env) {
return {
	// devtool: 'source-map',

	entry: {
		'FlipClock': [
			// './src/index.js',
			__dirname + '/src/FlipClock.jsx',
		]
	},

	output: {
		// path: path.resolve(__dirname, './www/build'),
		path: __dirname + '/dist',
		// publicPath: 'build/',
		filename: 'FlipClock.js',
		libraryTarget: 'commonjs2' // !!!
	},

	resolve: {
		modules: ['node_modules', 'src'],
		extensions: ['.js', '.jsx'],
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: [/node_modules/],
				loader: 'babel-loader'
				// use: ['react-hot-loader/webpack'],
				// use: ['react-hot-loader', 'babel-loader'],
			},

			{
				test: /\.scss$/,

				use: 
					// env == 'production' ?

					// ExtractTextPlugin.extract({
					// 	fallback: "style-loader",
					// 	use: 
					// 		[
					// 			{loader: 'css-loader',  options: {url: false}},
					// 			{
					// 				loader: 'postcss-loader',
					// 				options: {
					// 					plugins: function () {
					// 						return [
					// 							autoprefixer(
					// 								'>1%',
					// 								'last 4 versions',
					// 								'Firefox ESR',
					// 								'not ie < 9' // React doesn't support IE8 anyway
					// 							)
					// 						]
					// 					}
					// 				}
					// 			}, 
					// 			{loader: 'sass-loader'},
					// 		],
					// 	})

					// :

					[
						'style-loader', 
						'css-loader', 
						{
							loader: 'postcss-loader',
							options: {
								plugins: function () {
									return [
										autoprefixer(
											'>1%',
											'last 4 versions',
											'Firefox ESR',
											'not ie < 9' // React doesn't support IE8 anyway
										)
									]
								}
							}
						}, 
						'sass-loader'
					],

			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(svg|png|jpe?g|ttf|woff2?|eot|ico|gif|html|swf|xml)$/, 
				// loader: 'file?name=[path][name].[ext]'
				use: 'url-loader'
				// loader: 'ignore-loader'
				// loader: 'url?limit=8182'
					// loader: 'url?limit=10000',
			},


		]
	},


	plugins: 
		env == 'production' ?

		[
			new webpack.DefinePlugin({
				'process.env': { NODE_ENV: JSON.stringify("production") },
				// 'process.env': { NODE_ENV: '"development"' },
				__DEVELOPMENT__: true,
			}),

			// new CleanWebpackPlugin(['build/app.css', 'build/app.js'], {
			new CleanWebpackPlugin(['*'], {
				root: __dirname + '/dist',
				verbose: true,
				dry: false, // true for simulation
			}),

			// new ExtractTextPlugin("styles.css")
			// new ExtractTextPlugin({
			// 	filename: "[name].css",
			// 	// filename: "[name].[contenthash].css",
			// 	// disable: process.env.NODE_ENV === "development"
			// }),

			// new webpack.LoaderOptionsPlugin({
			// 	minimize: true,
			// 	debug: false
			// }),

			// new webpack.optimize.UglifyJsPlugin({
			// 	beautify: false,
			// 	mangle: {
			// 		keep_fnames: true,
			// 		screw_ie8: true
			// 	},
			// 	compress: {
			// 		warnings: false,
			// 		screw_ie8: true
			// 	},
			// 	comments: false
			// })

		]

		:

		[
			// new webpack.NamedModulesPlugin(),

			// new webpack.HotModuleReplacementPlugin(),

			new CleanWebpackPlugin(['*'], {
				root: __dirname + '/dist',
				verbose: true,
				dry: false, // true for simulation
			}),

			function(){
				this.plugin('done', function(stats) {
					console.log('\n\n\n================================================================\n\n');
					console.log('[' + new Date().toLocaleString() + ']' + ' Begin a new compilation.\n\n');
				});
			}
		]
	,

	externals: {
		'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
	}

}
}

