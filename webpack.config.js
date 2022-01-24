
const path = require('path')
const package = require('./package.json')
const relative = file => path.join(__dirname, file)

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')

const cssLoaders = (useModules = false) => [
	{ loader: MiniCssExtractPlugin.loader },
	{ 	
		loader: 'css-loader', 
		options: { 
			url: false,
			modules: !!useModules,
			importLoaders: 1
		}
	},
	{ 
		loader: 'postcss-loader', 
		options: { 
			postcssOptions: { 
				plugins : [
					require('autoprefixer'),
					require('postcss-preset-env')
				]
			}
		} 
	}
]

const client = (env, options) => ({
  	entry: package.config.entry || {},
  	output: {
		path: relative(package.config.public || ''),
		filename: '[name].js',
  	},
  	mode: 'production',
  	devtool: 'source-map',
  	stats: {
		all: false,
		assets: true,
		assetsSort: '!size',
		assetsSpace: 10,
		relatedAssets: false,
		cachedAssets: false,
		errors: true,
  	},
  	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: { loader: 'babel-loader' }
		  	},
	  		{
	  			test: /\.less$/,
	  			use: [
	  				...cssLoaders(),
	  				{ 
	  					loader: 'less-loader',
	  					options: {
	  						lessOptions : {
	  							strictMath: true,
	  							// resolve urls relative to @import-ed file when true
	  							relativeUrls: false, 
	  						}
	  					}
	  				}
	  			]
	  	  	},
	  	  	{
	  			test: /\.css$/,
	  			use: [ ...cssLoaders() ]
	  	  	},
		]
  	},
	plugins: [
		new RemoveEmptyScriptsPlugin(),
		new MiniCssExtractPlugin({ filename: '[name].css' }),
		(options.mode === 'production') && new CssMinimizerPlugin()
	].filter(n => n)
})

module.exports = [client]



