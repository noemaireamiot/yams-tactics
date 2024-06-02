const { composePlugins, withNx } = require('@nx/rspack');
const { CopyRspackPlugin, ProgressPlugin } = require('@rspack/core');

/**
 * typeorm/platform will require a lot of database connector we don't own
 * Default them to pg to bypass warning
 */
const typeormFakeResolverOtherDatabaseThanPg = {
  resolve: {
    alias: {
      mysql: 'pg',
      oracledb: 'pg',
      'sql.js': 'pg',
      'better-sqlite3': 'pg',
      mssql: 'pg',
      mongodb: 'pg',
      mysql2: 'pg',
      '@google-cloud/spanner': 'pg',
      'hdb-pool': 'pg',
      '@sap/hana-client': 'pg',
      'react-native-sqlite-storage': 'pg',
      'typeorm-aurora-data-api-driver': 'pg',
      sqlite3: 'pg',
    },
  },
};

module.exports = composePlugins(withNx(), (config) => {
  return {
    ...config,
    resolve: {
      alias: {
        ...config.resolve.alias,
        ...typeormFakeResolverOtherDatabaseThanPg.resolve.alias,
      },
    },
    builtins: {},
    plugins: [
      new CopyRspackPlugin(config.builtins.copy),
      new ProgressPlugin(config.builtins.progress),
    ],
    stats: {
      preset: 'normal',
    },
    devtools: 'cheap-source-map',
    // externals: [
    //   function ({ request }, callback) {
    //     // Everything should be externals except our code and swc helpers
    //     // This help producing a smaller bundle.
    //     if (
    //       /^@swc\/helpers/.test(request) ||
    //       /^@yams-tactics\//.test(request) ||
    //       /nx-rspack-example\/(libs|apps)/.test(request) ||
    //       /^[.][.]?/.test(request)
    //     ) {
    //       callback();
    //     }
    //     return callback(null, request);
    //   },
    // ],
  };
});
