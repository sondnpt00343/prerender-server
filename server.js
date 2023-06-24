#!/usr/bin/env node
const prerender = require('./lib');
const cache = require('prerender-redis-cache');

const server = prerender({
    chromeFlags: [
        "--headless",
        "--disable-gpu",
        "--remote-debugging-port=9222",
        "--hide-scrollbars",
        "--no-sandbox"
      ]
});

server.use(prerender.sendPrerenderHeader());
// server.use(prerender.browserForceRestart());
server.use(prerender.blockResources());
server.use(prerender.addMetaTags());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.use(cache);

server.start();
