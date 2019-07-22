const withPlugins = require('next-compose-plugins');
const withOffline = require('next-offline');

const nextConfig = {
  target: 'serverless',
  webpack(config) {
    config.resolve.alias['react'] = 'preact/compat';
    config.resolve.alias['react-dom'] = 'preact/compat';
    return config;
  },
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
};

module.exports = withPlugins([[withOffline, {}]], nextConfig);
