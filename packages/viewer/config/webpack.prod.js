const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('./../package.json')

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/viewer/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'viewer',
            filename: 'remoteEntry.js',
            exposes: {
                './PolicyViewerApp': './src/bootstrap'
            },
            shared: packageJson.dependencies,
        })
    ]
}

module.exports = merge(commonConfig, prodConfig) // <- 2nd param overrides 1st