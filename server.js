#!/usr/bin/env node
const prerender = require("prerender");
const cache = require("prerender-redis-cache");

const server = prerender({
  chromeFlags: [
    "--headless",
    "--disable-gpu",
    "--remote-debugging-port=9222",
    "--hide-scrollbars",
    "--window-size=414,736",
    ...process.env.CHROME_FLAGS.split(","),
  ],
});

server.use(prerender.sendPrerenderHeader());
server.use(prerender.blockResources());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.use(cache);

server.start();
