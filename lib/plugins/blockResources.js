const blockedResources = [
  "googletagmanager.com",
  "google-analytics.com",
  "api.mixpanel.com",
  "fonts.googleapis.com",
  "stats.g.doubleclick.net",
  "mc.yandex.ru",
  "use.typekit.net",
  "beacon.tapfiliate.com",
  "js-agent.newrelic.com",
  "api.segment.io",
  "woopra.com",
  "static.olark.com",
  "static.getclicky.com",
  "fast.fonts.com",
  "youtube.com/embed",
  "cdn.heapanalytics.com",
  "googleads.g.doubleclick.net",
  "pagead2.googlesyndication.com",
  "fullstory.com/rec",
  "navilytics.com/nls_ajax.php",
  "log.optimizely.com/event",
  "hn.inspectlet.com",
  "tpc.googlesyndication.com",
  "partner.googleadservices.com",
  ".ttf",
  ".eot",
  ".otf",
  ".woff",
  ".woff2",
  ".png",
  ".gif",
  ".tiff",
  ".pdf",
  ".jpg",
  ".jpeg",
  ".webp",
  ".ico",
  ".svg",
];

module.exports = {
  tabCreated: (req, res, next) => {
    req.prerender.tab.Fetch.enable({
      patterns: [{ urlPattern: "*" }],
    }).then(() => {
      next();
    });

    req.prerender.tab.Fetch.requestPaused(({ requestId, request }) => {
      let shouldBlock = false;
      blockedResources.forEach((substring) => {
        if (request.url.indexOf(substring) >= 0) {
          shouldBlock = true;
        }
      });

      if (shouldBlock) {
        req.prerender.tab.Fetch.failRequest({
          requestId,
          errorReason: "Aborted",
        });
      } else {
        req.prerender.tab.Fetch.continueRequest({ requestId });
      }
    });
  },
};
