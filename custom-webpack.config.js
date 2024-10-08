const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

module.exports = {
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ["de", "en", "ru"],
    })
  ],
};
