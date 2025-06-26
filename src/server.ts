import app from "./app.ts";
import config from "./config/config.ts";

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
