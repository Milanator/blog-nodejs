import express from "express";
import bodyParser from "body-parser";

// routes
import postRoutes from "./routes/post.js";

const app = express();
const port = 4000;

// plugins
app.use(bodyParser.json());

// routes
app.use("/api/v1/post", postRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
