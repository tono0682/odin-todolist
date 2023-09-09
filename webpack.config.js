const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './', // Set the publicPath to './' or your desired path
        // clean: true,
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator : {
                    filename : 'images/[name][ext][query]',
                  },
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader'],
            },
        ],
    },
};
