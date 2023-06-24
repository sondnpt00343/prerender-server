#!/usr/bin/env node
const prerender = require('./lib');
const cache = require('prerender-redis-cache');

var server = prerender();

server.use(prerender.sendPrerenderHeader());
server.use(prerender.browserForceRestart());
// server.use(prerender.blockResources());
server.use(prerender.addMetaTags());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
server.use(cache);

server.start();
