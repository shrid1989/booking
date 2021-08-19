module.exports = function (api) {
  api.cache(true);

  const presets = ['@babel/preset-env', '@babel/preset-react'];
  const plugins = ['react-hot-loader/babel'];
  const env = {
    production: {
      presets: ['minify'],
    },
  };

  return {
    presets,
    plugins,
    env,
  };
};
