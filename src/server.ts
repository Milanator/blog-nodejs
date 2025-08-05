import app from "./app.ts";
import config from "./config/config.ts";
import database from "./plugins/database.ts";
import fs from "fs";
// import https from "https";

database().then(() => {
  // const certificate = fs.readFileSync("server.cert");
  // const privateKey = fs.readFileSync("server.key");

  // https and certificates
  // https
  //   .createServer({ key: privateKey, cert: certificate }, app)
  //   .listen(config.port);
  app.listen(config.port);
});
