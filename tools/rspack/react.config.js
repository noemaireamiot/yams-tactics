const { composePlugins, withNx, withReact } = require('@nx/rspack');
const {
  DefinePlugin,
  ProgressPlugin,
  CopyRspackPlugin,
  HtmlRspackPlugin,
} = require('@rspack/core');

module.exports = composePlugins(withNx(), withReact(), (config) => {
  config.module.rules.push({
    test: /\.scss$|\.css$/,
    type: 'css',
    loader: 'postcss-loader',
  });

  return {
    ...config,
    plugins: [
      ...config.plugins,
      new ProgressPlugin(config.builtins.progress),
      new HtmlRspackPlugin(config.builtins.html[0]),
      new CopyRspackPlugin(config.builtins.copy),
      new DefinePlugin(config.builtins.define),
    ],
    builtins: {
      react: config.builtins.react,
    },
    devServer: {
      historyApiFallback: true,
      // SSE ?
      // proxy: [
      //   {
      //     context: ['/api'],
      //     target: 'http://localhost:3000',
      //   },
      // ],
    },
  };
});
