// allows us to merge common and prod webpack files
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
// requiring this in so we can have Webpack combine all shared files for us
const packageJson = require('../package.json');

// env variable will be defined when we build add through CICD pipeline
// env variable will contain string that will show us where the app is hosted
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    // makes sure js files get optimized for production build
    mode: 'production',
    output: {
        // any js files that are built are built in this template
        // content hash is there for caching issues
        filename: '[name].[contenthash].js',
        // this is needed so the src tag that gets added by the plugin will prepend container/latest which is where main is stored in the s3 bucket
        publicPath: '/container/latest/',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                // domain name where the app will be hosted
                marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
                auth: `auth@${domain}/auth/latest/remoteEntry.js`,
            },
            shared: packageJson.dependencies
        })
    ]

}

module.exports = merge(commonConfig, prodConfig);