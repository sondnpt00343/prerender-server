# Docker Image for Prerender

Dockerized Prerender + Chrome Headless (chromium-browser on Alpine Linux)

https://prerender.io is an open-source nodeJS based web server that servers HTML for web crawlers like Google, Twitter, Slack preview bots and so on. It is used to make SEO for single page web apps built with any framework: React, Angular, VueJS ...

### Setup
You can secure prerender in 3 ways:
* make it public and use the whitelist/blacklist options
* expose the port to the localhost but binding it only to local interface: `-p 127.0.0.1:3000:3000`
* do not expose the port and put it in a docker network

Docker run: https://docs.docker.com/engine/reference/run/

Prerender: https://prerender.io/documentation

Redis cache plugin: https://github.com/JonathanBennett/prerender-redis-cache

### Examples

Run it with default settings, and expose the port to the public:
```bash
docker run --detach \
    --name prerender \
    -it \
    -p 3000:3000 \
    sondnpt00343/prerender
```

Run it with 7 days cache:

```bash
docker run --detach \
    --name prerender \
    -it \
    --network my-net \
    -e "REDIS_URL=redis://:password@host:6379/1" \
    -e "PAGE_TTL=604800" \
    sondnpt00343/prerender
```

To debug the app (see prerender logs):
* run it in foreground (without --detach)
* watch the logs `docker logs -f prerender`
* attach your current terminal session to the prerender process `sudo docker attach prerender`

### Cache

You can see the cache in action by reading the logs, eg from multiple calls of `curl localhost:3000/https://twitter.com` you may get <15ms subsequent responses:

```bash
2023-6-06T19:58:42.354Z got 200 in 2910ms for https://twitter.com/
2023-6-06T19:59:08.905Z getting https://twitter.com/
2023-6-06T19:59:08.917Z got 200 in 12ms for https://twitter.com/
2023-6-06T19:59:11.551Z getting https://twitter.com/
2023-6-06T19:59:11.557Z got 200 in 6ms for https://twitter.com/
```

Because the buffer is in redis, to flush it (e.g. at every major release) you just need to flush redis.