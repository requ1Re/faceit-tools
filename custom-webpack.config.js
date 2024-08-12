const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const { EnvironmentPlugin } = require('webpack');

require('dotenv').config();

module.exports = {
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ["de", "en", "ru"],
    }),
    new EnvironmentPlugin([
      'FACEIT_API_KEY'
    ])
  ],
};
