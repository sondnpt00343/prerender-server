#!/usr/bin/env node
const prerender = require("prerender");
const cache = require("prerender-redis-cache");

const server = prerender();

server.use(prerender.sendPrerenderHeader());
server.use(prerender.blockResources());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.use(cache);

server.start();
