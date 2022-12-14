const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('./../package.json')

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container', // host name is never used
            remotes: {
                // namespace: 'remotename@remoteaddress/remotefile'
                'marketing': 'marketing@http://localhost:8081/remoteEntry.js'
            },
            shared: packageJson.dependencies,
        })
    ]
}

module.exports = merge(commonConfig, devConfig) // <- 2nd param overrides 1st