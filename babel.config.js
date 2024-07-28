module.exports = function (api) {
  api.cache(true);
  const plugins = ["nativewind/babel"];
  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
