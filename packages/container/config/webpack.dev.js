const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json')

const devConfig = {
    mode: 'development',
    output: {
        // specifies output config for the bundled files
        publicPath: 'http://localhost:8080/'
    },
    // configures the development server
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            // container can load  these remote modules dynamically
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js',
                dashboard: 'dashboard@http://localhost:8083/remoteEntry.js',
            },
            // shared dependencies
            shared: packageJson.dependencies,
        }),
    ]
};

// devConfig is listed second so it'll take priority over common options that are in 
//the commonConfig file
module.exports = merge(commonConfig, devConfig);

