const express = require("express");
const path = require("path");
const pinoHttp = require("pino-http");
const pino = require("pino");
var serveStatic = require("serve-static");

//Setup logger
const httpLogger = pinoHttp();
const logger = pino();

const app = express();

app.use(httpLogger);

app.use(
  serveStatic(path.join(__dirname, "dist/"), {
    maxAge: "30d",
    index: false,
  })
);

app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"), (err) => {
    if (err) {
      res.status(404).end();
    }
  });
});

app.listen(8080, () => {
  logger.info({ port: 8080 }, "express started");
});
