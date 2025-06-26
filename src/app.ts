import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// routes
import postRoutes from "./routes/post.ts";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// plugins
app.use(bodyParser.json());

// routes
app.use("/api/v1/post", postRoutes);

export default app;
