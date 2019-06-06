const withTypescript = require("@zeit/next-typescript");
module.exports = withTypescript({
  /* config options here */
  webpack(config, options) {
    return config;
  }
});
