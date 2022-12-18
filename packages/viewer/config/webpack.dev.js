const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('./../package.json')

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8084/'
    },
    devServer: {
        port: 8084,
        historyApiFallback: true
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

module.exports = merge(commonConfig, devConfig) // <- 2nd param overrides 1st