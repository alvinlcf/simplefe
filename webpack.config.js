const TerserPlugin = require("terser-webpack-plugin");
// const Uglify = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    target: "web",

    // webpack-dev-server will monitor the code dependency
    // of these entry points, and re-create the bundle
    // when changes are detected. In this example, the main
    // javascript is main.js, and it points to
    // other code dependencies
    // entry: {
    //     app: ["./src/index.js"]
    // },
    entry: './src/index.js',


    // This specifies where javascript bundle is created when
    // webpack CLI is run. However, webpack-dev-server is only 
    // concerned with the 'filename' parameter.
    // webpack-dev-server generates the bundle with the 'filename' in
    // memory. It never creates an actual file in the 'path' specified
    // unlike the webpack CLI.  
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js",
    },

    optimization: {
        usedExports: true, // <- remove unused function
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ecma: undefined,
                    parse: {},
                    compress: {},
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    module: false,
                    // Deprecated
                    output: null,
                    format: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false,
                },
            })
        ],
    },

    // webpack-dev-server configuration
    devServer: {
        // 'Live-reloading' happens when you make changes to code
        // dependency pointed to by 'entry' parameter explained earlier.
        // To make live-reloading happen even when changes are made
        // to the static html pages in 'contentBase', add 
        // 'watchContentBase'
        watchContentBase: true,

        // The local filesystem directory where static html files
        // should be placed.
        // Put your main static html page containing the <script> tag
        // here to enjoy 'live-reloading'
        // E.g., if 'contentBase' is '../views', you can
        // put 'index.html' in '../views/main/index.html', and
        // it will be available at the url:
        //   https://localhost:9001/main/index.html
        contentBase: path.resolve(__dirname, "./dist/keycloak-tasks"),

        // This is where webpack-dev-server serves your bundle
        // which is created in memory.
        // To use the in-memory bundle,
        // your <script> 'src' should point to the bundle
        // prefixed with the 'publicPath', e.g.:
        //   <script src='http://localhost:9001/assets/bundle.js'>
        //   </script>
        publicPath: './dist/keycloak-tasks',

        compress: true,

        historyApiFallback: true,
        //hot: true,

        proxy: {
            "/reports/*": {
                "target": "http://172.28.42.154:8000",
                "secure": false,
                "logLevel": "debug",
                "changeOrigin": true,
                "pathRewrite": {
                    "^/sample/api/settings": "/api/pathrewriteurlhere/settings",
                    "^/api": ""
                }
            }

        }
    }
};