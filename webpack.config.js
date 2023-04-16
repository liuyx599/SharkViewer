const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  // devtool: 'source-map',
  devServer: {
    static: './lib',
    open: true
  },
  externals: {
    three: 'THREE',
  },
  entry: './src/shark_viewer.js',       // entry是指定要打包的入口文件， 相当于源码
  output: {                            // output指定打包之后的输出文件的路径和文件名（只有一个出口）
    filename: 'shark_viewer.js',
    path: path.resolve(__dirname, 'lib'),
    library: 'sharkViewer'
  }
};
