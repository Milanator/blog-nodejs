import app from "./app.ts";
import config from "./config/config.ts";
import database from "./plugins/database.ts";

database().then(() => {
  app.listen(config.port);
});
