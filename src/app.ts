import express from "express";
import bodyParser from "body-parser";

// routes
import postRoutes from "./routes/post.ts";

const app = express();

// plugins
app.use(bodyParser.json());

// routes
app.use("/api/v1/post", postRoutes);

export default app