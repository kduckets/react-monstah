module.exports = {
    entry: ['./app/main.js'],
    output: {
        path: './public',
        filename: 'bundle.js',
        publicPath: 'http://localhost:8080/assets'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'jsx-loader' }
        ]
    }
};
