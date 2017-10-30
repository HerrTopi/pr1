const express = require("express");
const app = express();
const rest = require("./routes/rest");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");

app.use(cors());
//react hot reload
if (process.env.NODE_ENV != "production") {
  const config = require("./webpack.config.dev.js");
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");

  const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    })
  );
  app.use(webpackHotMiddleware(compiler));
}
// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//static
app.use(express.static("public"));

app.use("/rest", rest);

//listen
app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on :" + (process.env.PORT || 3000));
});
