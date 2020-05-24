const path = require('path');
const chalk = require('chalk');
const { override } = require('customize-cra');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

const addCustom = () => (config) => {
  // alias 配置
  config.resolve.alias = {
    '@': resolve('src')
  };

  // plugins
  config.plugins.push(
    ...[
      new ProgressBarPlugin({
        format: 'build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
        clear: false
      })
    ]
  );

  return config;
};

module.exports = {
  webpack: override(addCustom())
};
