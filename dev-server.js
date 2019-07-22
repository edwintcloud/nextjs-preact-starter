require('module-alias/register');

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const app = next({ dev: 'development' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res, parse(req.url, true));
  }).listen(3000, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:3000`);
  });
});
