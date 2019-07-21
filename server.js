require('module-alias/register');
const compression = require('compression');
const express = require('express');
const next = require('next');
const cacheableResponse = require('cacheable-response');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
let ssrCache;

if (dev) {
  ssrCache = cacheableResponse({
    ttl: 0,
    get: async ({ req, res, pagePath, queryParams }) => ({
      data: await app.renderToHTML(req, res, pagePath, queryParams),
    }),
    send: ({ data, res }) => res.send(data),
  });
} else {
  ssrCache = cacheableResponse({
    ttl: 1000 * 60 * 60, // 1hour
    get: async ({ req, res, pagePath, queryParams }) => ({
      data: await app.renderToHTML(req, res, pagePath, queryParams),
    }),
    send: ({ data, res }) => res.send(data),
  });
}

app.prepare().then(() => {
  /* Create Server */
  const server = express();
  server.use(compression());

  /* Route */
  server.get('/', (req, res) => {
    ssrCache({ req, res, pagePath: '/' });
  });

  server.get('*', (req, res) => {
    handle(req, res);
  });

  /* Listen */
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
