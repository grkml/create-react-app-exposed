const path = require("path");
const webpack = require("webpack");
const portToUse = process.env.PORT || 3000;

module.exports = {
  entry: "./src/index.js", // tells Webpack where to start bundling our files
  mode: "development", // mode flag for the development server
  
  // Module object helps define: 
  // How your exported javascript modules are transformed
  // Which ones are included according to the given array of rules
  module: {
    rules: [
      { // JSX rule
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      { // CSS rule
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  // The resolve property allows us to specify which extensions Webpack will resolve.
  // this allows us to import modules without needing to add their extensions.
  resolve: { extensions: ["*", ".js", ".jsx"] },
  
  // The output property tells Webpack where to put our bundled code. 
  // The publicPath property specifies what directory the bundle should go in, 
  // and also tells webpack-dev-server where to serve files from.
  // The publicPath property is a special property that helps us with our dev-server. 
  // It specifies the public URL of the the directory - at least as far as webpack-dev-server will know or care. 
  // If this is set incorrectly, you’ll get 404’s as the server won’t be serving your files from the correct location!
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  
  // We set up webpack-dev-server in the devServer property. 
  // This doesn’t require much for our needs - just the location we’re serving 
  // static files from (such as our index.html) and the port we want to run the server on. 
  // Note that devServer also has a publicPath property. 
  // This publicPath tells the server where our bundled code actually is.
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: portToUse,
    publicPath: `http://localhost:${portToUse}/dist/`,
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};